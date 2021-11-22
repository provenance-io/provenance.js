import { assert, expect, use } from 'chai';
import * as chainAsPromise from 'chai-as-promised';
import { createHash } from 'crypto';
import { 
    existsSync,
    readFileSync,
} from 'fs';
import * as path from 'path';
import { Cavendish } from '@provenanceio/cavendish';
import { MockProvider } from './mock/MockProvider';

import { 
    CodeAccessType,
    ProvenanceClient,
    Wallet, 
} from '../src';

const WasmCoreTestConfig = {
    BIP39_MNEMONIC: 'name broom medal pen slogan blush version banana message grant all decline weekend rhythm near art imitate milk winter clap awesome green soccer beauty',

    HELLO_WORLD: {
        INSTANCE_1: {
            WASM_FILE: './test/contract/hello_world_v0.1.0/hello_world.wasm',
            INIT_ARGS: {
                bind_name: 'hello-1.sc.pb',
                contract_name: 'hello_world',
            },
            CONTRACT_LABEL: 'hello_world_1',
            VERSION: '0.1.0',
        },
        INSTANCE_2: {
            WASM_FILE: './test/contract/hello_world_v0.1.1/hello_world.wasm',
            INIT_ARGS: {
                bind_name: 'hello-2.sc.pb',
                contract_name: 'hello_world',
            },
            CONTRACT_LABEL: 'hello_world_2',
            VERSION: '0.1.1',
        }
    },

    MESSAGE_ID: '4291b797-fe98-49c2-8927-897c1c1d5de6',
    CUSTOM_MESSAGE: 'provenance.js is awesome!',
    STATE_STORE_KEYS: {
        MESSAGE_KEY: 'AAdtZXNzYWdlNDI5MWI3OTctZmU5OC00OWMyLTg5MjctODk3YzFjMWQ1ZGU2',
        CONTRACT_INFO_KEY: 'Y29udHJhY3RfaW5mbw==',
    }
};

use(chainAsPromise);

describe('WasmCore', function () {

    this.timeout(15000);

    const cavendish = new Cavendish();

    const provider = new MockProvider();
    const client = new ProvenanceClient(provider);

    const wallet = Wallet.fromMnemonic(WasmCoreTestConfig.BIP39_MNEMONIC, false);
    const creator = wallet.getKey(0, 0);
    const admin = wallet.getKey(0, 1);
    const executor = wallet.getKey(0, 2);

    var wasmBytecode1: Buffer;
    var wasmBytecode2: Buffer;
    
    var codeId1: number;
    var codeId2: number;

    var contractAddress1: string;
    var contractAddress2: string;

    before(async () => {

        // load the hello_world v0.1.0 contract bytecode
        const wasmFile1 = path.join(process.cwd(), WasmCoreTestConfig.HELLO_WORLD.INSTANCE_1.WASM_FILE);
        expect(existsSync(wasmFile1)).to.equal(true);
        wasmBytecode1 = readFileSync(wasmFile1);

        // load the hello_world v0.1.1 contract bytecode
        const wasmFile2 = path.join(process.cwd(), WasmCoreTestConfig.HELLO_WORLD.INSTANCE_2.WASM_FILE);
        expect(existsSync(wasmFile2)).to.equal(true);
        wasmBytecode2 = readFileSync(wasmFile2);

        // start the localnet blockchain
        await cavendish.start({
            mnemonic: WasmCoreTestConfig.BIP39_MNEMONIC,
            accounts: 3,
            rootNames: [
                { name: 'pb', restrict: false },
                { name: 'sc.pb', restrict: false },
            ]
        }, {
            background: true,
            force: true
        });

    });

    describe('#storeCode', function () {

        it(`Stores WASM bytecode using no access config`, async () => {
            const txRes = await client.wasm.storeCode(wasmBytecode1, creator.address).broadcastTx(creator);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            try {
                // TODO: message log and event filtering utils needs to be added when event stream support goes in
                codeId1 = Number.parseInt(txRes.logsList
                    .find((log) => { return (log.msgIndex === 0); }).eventsList
                    .find((event) => { return (event.type === 'store_code'); }).attributesList
                    .find((attr) => { return (attr.key === 'code_id'); })
                    .value
                );
            } catch(err) {
                assert.fail(`Unable to locate WASM code id: ${err.message}`);
            }

            expect(codeId1).to.be.greaterThan(0);
        });

        it(`Stores WASM bytecode using access config`, async () => {
            const txRes = await client.wasm.storeCode(
                wasmBytecode2, 
                creator.address, {
                    address: creator.address,
                    permission: CodeAccessType.ACCESS_TYPE_ONLY_ADDRESS
                }
            ).broadcastTx(creator);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            try {
                // TODO: message log and event filtering utils needs to be added when event stream support goes in
                codeId2 = Number.parseInt(txRes.logsList
                    .find((log) => { return (log.msgIndex === 0); }).eventsList
                    .find((event) => { return (event.type === 'store_code'); }).attributesList
                    .find((attr) => { return (attr.key === 'code_id'); })
                    .value
                );
            } catch(err) {
                assert.fail(`Unable to locate WASM code id: ${err.message}`);
            }

            expect(codeId2).to.be.greaterThan(0);
        });

    });

    describe('#code', function () {

        it(`Gets the code info of a stored contract`, async () => {
            const code = await client.wasm.code(codeId1);

            expect(code.info.codeId).to.equal(codeId1);
            expect(code.info.creator).to.equal(creator.address);

            // calculate the hashes of the local WASM file and the bytecode on chain
            const fileHash = createHash('sha256').update(wasmBytecode1).digest().toString('hex');
            const onChainHash = createHash('sha256').update(code.bytecode).digest().toString('hex');

            expect(onChainHash).to.equal(fileHash);
        });

        it(`Cannot get code info of an invalid code id`, async () => {
            expect(client.wasm.code(1000)).to.eventually.be.rejected;
        });

    });

    describe('#codes', function () {

        it(`Gets code info for all stored contracts`, async () => {
            const codes = await client.wasm.codes();
            expect(codes.length).to.equal(2);

            var foundCodeId1 = false;
            var foundCodeId2 = false;
            codes.forEach((code) => {
                if (code.codeId === codeId1) {
                    foundCodeId1 = true;
                } else if (code.codeId === codeId2) {
                    foundCodeId2 = true;
                }
            });

            expect(foundCodeId1, `Failed to find stored contract ${codeId1}`).to.equal(true);
            expect(foundCodeId2, `Failed to find stored contract ${codeId2}`).to.equal(true);
        });

    });

    describe('#instantiateContract', function () {

        it(`Instantiates a stored contract`, async () => {
            const txRes = await client.wasm.instantiateContract(
                codeId1, 
                WasmCoreTestConfig.HELLO_WORLD.INSTANCE_1.CONTRACT_LABEL, 
                creator.address,
                WasmCoreTestConfig.HELLO_WORLD.INSTANCE_1.INIT_ARGS
            ).broadcastTx(creator);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            try {
                // TODO: message log and event filtering utils needs to be added when event stream support goes in
                contractAddress1 = txRes.logsList
                    .find((log) => { return (log.msgIndex === 0); }).eventsList
                    .find((event) => { return (event.type === 'instantiate'); }).attributesList
                    .find((attr) => { return (attr.key === '_contract_address'); })
                    .value;
            } catch(err) {
                assert.fail(`Unable to locate contract address: ${err.message}`);
            }

            expect(contractAddress1).to.not.be.empty;
        });

        it(`Cannot instantiate another instance of a stored contract with the same bound name`, async () => {
            expect(client.wasm.instantiateContract(
                codeId1, 
                WasmCoreTestConfig.HELLO_WORLD.INSTANCE_2.CONTRACT_LABEL, 
                creator.address,
                WasmCoreTestConfig.HELLO_WORLD.INSTANCE_1.INIT_ARGS // same bind_name in the init args
            ).broadcastTx(creator)).to.eventually.be.rejected;
        });

        it(`Instantiates another instance of a stored contract`, async () => {
            const txRes = await client.wasm.instantiateContract(
                codeId1, 
                WasmCoreTestConfig.HELLO_WORLD.INSTANCE_2.CONTRACT_LABEL, 
                creator.address,
                WasmCoreTestConfig.HELLO_WORLD.INSTANCE_2.INIT_ARGS
            ).broadcastTx(creator);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            try {
                // TODO: message log and event filtering utils needs to be added when event stream support goes in
                contractAddress2 = txRes.logsList
                    .find((log) => { return (log.msgIndex === 0); }).eventsList
                    .find((event) => { return (event.type === 'instantiate'); }).attributesList
                    .find((attr) => { return (attr.key === '_contract_address'); })
                    .value;
            } catch(err) {
                assert.fail(`Unable to locate contract address: ${err.message}`);
            }

            expect(contractAddress2).to.not.be.empty;
            expect(contractAddress2).to.not.equal(contractAddress1)
        });

    });

    describe('#contractInfo', function () {

        it(`Gets the contract info of a contract`, async () => {
            const contractInfo = await client.wasm.contractInfo(contractAddress1);

            expect(contractInfo.codeId).to.equal(codeId1);
            expect(contractInfo.admin).to.equal(creator.address);
            expect(contractInfo.creator).to.equal(creator.address);
            expect(contractInfo.label).to.equal(WasmCoreTestConfig.HELLO_WORLD.INSTANCE_1.CONTRACT_LABEL);
        });

    });

    describe('#contractsByCode', function () {

        it(`Gets all contracts by code id`, async () => {
            const contracts = await client.wasm.contractsByCode(codeId1);
            expect(contracts.length).to.equal(2);

            var foundContract1 = false;
            var foundContract2 = false;
            contracts.forEach((contract) => {
                if (contract === contractAddress1) {
                    foundContract1 = true;
                } else if (contract === contractAddress2) {
                    foundContract2 = true;
                }
            });

            expect(foundContract1, `Failed to find contract instance ${contractAddress1}`).to.equal(true);
            expect(foundContract2, `Failed to find contract instance ${contractAddress2}`).to.equal(true);
        });

        it(`Cannot get all contracts for an invalid code id`, async () => {
            const contracts = await client.wasm.contractsByCode(1000);
            expect(contracts.length).to.equal(0);
        });

    });

    describe('#executeContract', function () {

        it(`Executes the 'say_hello' function of the 'hello_world' contract`, async () => {
            const txRes = await client.wasm.executeContract(contractAddress1, executor.address, {
                say_hello: {
                    id: WasmCoreTestConfig.MESSAGE_ID
                }
            }).broadcastTx(executor);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Executes the 'say_goodbye' function of the 'hello_world' contract`, async () => {
            const txRes = await client.wasm.executeContract(contractAddress1, executor.address, {
                say_goodbye: {
                    id: WasmCoreTestConfig.MESSAGE_ID
                }
            }).broadcastTx(executor);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Executes the 'say_something_else' function of the 'hello_world' contract`, async () => {
            const txRes = await client.wasm.executeContract(contractAddress1, executor.address, {
                say_something_else: {
                    id: WasmCoreTestConfig.MESSAGE_ID,
                    message: WasmCoreTestConfig.CUSTOM_MESSAGE
                }
            }).broadcastTx(executor);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Handles execution failures`, async () => {
            expect(client.wasm.executeContract(contractAddress1, executor.address, {
                say_hello: {} // missing the 'id' field
            }).broadcastTx(executor)).to.eventually.be.rejected;
        });

    });

    describe('#allContractStates', function () {

        it(`Gets all contract states for a contract instance`, async () => {
            const states = await client.wasm.allContractStates(contractAddress1);
            expect(states.length).to.equal(2);

            // the hello_world contract should have 2 states in the state store: the contract_info and the message
            var foundMessageState = false;
            var foundContractInfoState = false;
            states.forEach((state) => {
                if (state.key === WasmCoreTestConfig.STATE_STORE_KEYS.MESSAGE_KEY) {
                    foundMessageState = true;
                } else if (state.key === WasmCoreTestConfig.STATE_STORE_KEYS.CONTRACT_INFO_KEY) {
                    foundContractInfoState = true;
                }
            })

            expect(foundMessageState, `Failed to find message state for hello_world contract`).to.equal(true);
            expect(foundContractInfoState, `Failed to find contract info state for hello_world contract`).to.equal(true);
        });

    });

    /* TODO: not sure how to test the raw contract state
    describe('#rawContractState', function () {
    });
    */

    describe('#smartContractState', function () {

        it(`Gets smart contract state through a query`, async () => {
            const state = await client.wasm.smartContractState(contractAddress1, {
                get_message: {
                    id: WasmCoreTestConfig.MESSAGE_ID
                }
            });

            expect(state.id).to.equal(WasmCoreTestConfig.MESSAGE_ID);
            expect(state.message).to.equal(WasmCoreTestConfig.CUSTOM_MESSAGE);
        });

    });

    describe('#migrateContract', function () {

        it(`Migrates a smart contract instance`, async () => {
            const contractInfoBefore = await client.wasm.smartContractState(
                contractAddress1, 
                { get_contract_info: {} }
            );
            expect(contractInfoBefore.version).to.equal(WasmCoreTestConfig.HELLO_WORLD.INSTANCE_1.VERSION);

            const txRes = await client.wasm.migrateContract(
                contractAddress1, 
                codeId2, 
                creator.address,
                { migrate: {} }
            ).broadcastTx(creator);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            const contractInfoAfter = await client.wasm.smartContractState(
                contractAddress1, 
                { get_contract_info: {} }
            );
            expect(contractInfoAfter.version).to.equal(WasmCoreTestConfig.HELLO_WORLD.INSTANCE_2.VERSION);
        });

    });

    describe('#contractHistory', function () {

        it(`Gets the contract history of a smart contract instance`, async () => {
            const history = await client.wasm.contractHistory(contractAddress1);

            // this contract was initiated and the migrated, so we expect two entries
            expect(history.length).to.equal(2);
        });

    });

    describe('#updateAdmin', function () {

        it(`Updates the admin of a contract`, async () => {
            const txRes = await client.wasm.updateAdmin(
                contractAddress1, 
                admin.address, 
                creator.address
            ).broadcastTx(creator);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            const contractInfo = await client.wasm.contractInfo(contractAddress1);

            expect(contractInfo.codeId).to.equal(codeId2);
            expect(contractInfo.admin).to.equal(admin.address);
            expect(contractInfo.creator).to.equal(creator.address);
            expect(contractInfo.label).to.equal(WasmCoreTestConfig.HELLO_WORLD.INSTANCE_1.CONTRACT_LABEL);
        });

    });

    describe('#clearAdmin', function () {

        it(`Clears the admin of a contract`, async () => {
            const txRes = await client.wasm.clearAdmin(contractAddress1, admin.address).broadcastTx(admin);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            const contractInfo = await client.wasm.contractInfo(contractAddress1);

            expect(contractInfo.codeId).to.equal(codeId2);
            expect(contractInfo.admin).to.be.empty;
            expect(contractInfo.creator).to.equal(creator.address);
            expect(contractInfo.label).to.equal(WasmCoreTestConfig.HELLO_WORLD.INSTANCE_1.CONTRACT_LABEL);
        });

    });

    // clean-up after the tests run
    after(async () => {

        // stop and reset the localnet blockchain
        await cavendish.stopAndReset();

    });

});
