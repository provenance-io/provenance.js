import { expect, use } from 'chai';
import chaiAsPromise from 'chai-as-promised';
import { 
    existsSync,
    readFileSync,
} from 'fs';
import * as path from 'path';

import { Cavendish } from '@provenanceio/cavendish';
import { MockProvider } from './mock/MockProvider';

import { 
    ContractFactory,
    ProvenanceClient,
    Wallet, 
} from '../src';

const ContractTestConfig = {
    BIP39_MNEMONIC: 'name broom medal pen slogan blush version banana message grant all decline weekend rhythm near art imitate milk winter clap awesome green soccer beauty',

    HELLO_WORLD: {
        INSTANCE_1: {
            WASM_FILE: './test/contract/hello_world_v0.1.0/hello_world.wasm',
            SCHEMA_FILES: [
                './test/contract/hello_world_v0.1.0/schema/contract_info.json',
                './test/contract/hello_world_v0.1.0/schema/execute_msg.json',
                './test/contract/hello_world_v0.1.0/schema/instantiate_msg.json',
                './test/contract/hello_world_v0.1.0/schema/message_state.json',
                './test/contract/hello_world_v0.1.0/schema/migrate_msg.json',
                './test/contract/hello_world_v0.1.0/schema/query_msg.json',
            ],
            CONTRACT_LABEL: 'hello_world_1',
            VERSION: '0.1.0',
            TYPE: 'figure:smart-contracts.hello-world',
        },
        INSTANCE_2: {
            WASM_FILE: './test/contract/hello_world_v0.1.1/hello_world.wasm',
            SCHEMA_FILES: [
                './test/contract/hello_world_v0.1.1/schema/contract_info.json',
                './test/contract/hello_world_v0.1.1/schema/execute_msg.json',
                './test/contract/hello_world_v0.1.1/schema/instantiate_msg.json',
                './test/contract/hello_world_v0.1.1/schema/message_state.json',
                './test/contract/hello_world_v0.1.1/schema/migrate_msg.json',
                './test/contract/hello_world_v0.1.1/schema/query_msg.json',
            ],
            CONTRACT_LABEL: 'hello_world_2',
            VERSION: '0.1.1',
            TYPE: 'figure:smart-contracts.hello-world',
        }
    },

    INIT_ARGS: {
        bind_name: 'hello-1.sc.pb',
        contract_name: 'hello_world',
    },

    MESSAGE_ID_1: '941e3a3a-3908-4859-8fc8-cb7528632c11',
    MESSAGE_ID_2: '4baea95a-a933-44e6-a4ef-76f0da582fb2',
    MESSAGE_ID_3: '5bb09368-c196-40cf-b3a9-b392cc8bf830',

    CUSTOM_MESSAGE: 'provenance.js is awesome!',

    EXECUTE_WITH_FUNDS: {
        denom: 'nhash',
        amount: 1020304
    },
};

use(chaiAsPromise);

describe('Contract', function () {

    this.timeout(30000);

    const cavendish = new Cavendish();

    const provider = new MockProvider();
    const client = new ProvenanceClient(provider);

    const wallet = Wallet.fromMnemonic(ContractTestConfig.BIP39_MNEMONIC, false);
    const creator = wallet.getKey(0, 0);
    const user = wallet.getKey(0, 1);

    var wasmBytecode1: Buffer;
    var wasmBytecode2: Buffer;

    var factory: ContractFactory;
    var contractAddress: string;
    var migrateCodeId: number;

    // start localnet blockchain before the tests run
    before(async () => {

        // load the hello_world v0.1.0 contract bytecode
        const wasmFile1 = path.join(process.cwd(), ContractTestConfig.HELLO_WORLD.INSTANCE_1.WASM_FILE);
        expect(existsSync(wasmFile1)).to.equal(true);
        wasmBytecode1 = readFileSync(wasmFile1);

        // load the hello_world v0.1.0 schemas
        var schemas1: string[] = [];
        ContractTestConfig.HELLO_WORLD.INSTANCE_1.SCHEMA_FILES.forEach((schemaFile) => {
            const file = path.join(process.cwd(), schemaFile);
            expect(existsSync(file)).to.equal(true);
            schemas1.push(readFileSync(file).toString('utf-8'));
        });

        // load the hello_world v0.1.1 contract bytecode
        const wasmFile2 = path.join(process.cwd(), ContractTestConfig.HELLO_WORLD.INSTANCE_2.WASM_FILE);
        expect(existsSync(wasmFile2)).to.equal(true);
        wasmBytecode2 = readFileSync(wasmFile2);

        // load the hello_world v0.1.1 schemas
        var schemas2: string[] = [];
        ContractTestConfig.HELLO_WORLD.INSTANCE_2.SCHEMA_FILES.forEach((schemaFile) => {
            const file = path.join(process.cwd(), schemaFile);
            expect(existsSync(file)).to.equal(true);
            schemas2.push(readFileSync(file).toString('utf-8'));
        });

        // start the localnet blockchain
        await cavendish.start({
            mnemonic: ContractTestConfig.BIP39_MNEMONIC,
            accounts: 2,
            rootNames: [
                { name: 'pb', restrict: false },
                { name: 'sc.pb', restrict: false },
            ]
        }, {
            background: true,
            force: true
        });

        // create the contract factory
        factory = new ContractFactory(wasmBytecode1, schemas1, creator);

        // deploy the contract
        contractAddress = (await factory.deploy('hw-test-1', ContractTestConfig.INIT_ARGS)).address;

        // store another version of the contract to migrate to
        const factory2 = new ContractFactory(wasmBytecode2, schemas2, creator);
        migrateCodeId = await factory2.store();

    });

    describe('#connect', function () {

        it(`Connects to a contract with a signer`, async () => {
            const contract = await factory.attach(contractAddress);

            expect(contract.address).to.equal(contractAddress);
            expect(contract.signer).to.equal(undefined);
            expect(contract.admin).to.equal(undefined);

            const contractWithSigner = contract.connect(user);

            expect(contractWithSigner.address).to.equal(contractAddress);
            expect(contractWithSigner.signer.address).to.equal(user.address);
            expect(contractWithSigner.admin).to.equal(undefined);
        });

    });

    describe('Execute Functions', function () {

        it(`Executes 'sayHello' function`, async () => {
            const contract = (await factory.attach(contractAddress)).connect(user);

            const txRes = await contract.sayHello({
                id: ContractTestConfig.MESSAGE_ID_1
            }).broadcastTx(user);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Executes 'sayGoodbye' function`, async () => {
            const contract = (await factory.attach(contractAddress)).connect(user);

            const txRes = await contract.sayGoodbye({
                id: ContractTestConfig.MESSAGE_ID_2
            }).broadcastTx(user);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Executes 'saySomethingElse' function`, async () => {
            const contract = (await factory.attach(contractAddress)).connect(user);

            const txRes = await contract.saySomethingElse({
                id: ContractTestConfig.MESSAGE_ID_3,
                message: ContractTestConfig.CUSTOM_MESSAGE
            }).broadcastTx(user);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Executes 'sayHello' function with funds`, async () => {
            const contract = (await factory.attach(contractAddress)).connect(user);

            const txRes = await contract.sayHello({
                id: ContractTestConfig.MESSAGE_ID_1
            }, {
                denom: ContractTestConfig.EXECUTE_WITH_FUNDS.denom,
                amount: ContractTestConfig.EXECUTE_WITH_FUNDS.amount.toString()
            }).broadcastTx(user);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            const balance = await client.bank.balance(
                contract.address, 
                ContractTestConfig.EXECUTE_WITH_FUNDS.denom
            );

            expect(balance.denom).to.equal(ContractTestConfig.EXECUTE_WITH_FUNDS.denom);
            expect(balance.amount).to.equal(ContractTestConfig.EXECUTE_WITH_FUNDS.amount.toString());
        });

    });

    describe('Query Functions', function () {

        it(`Queries 'getContractInfo' function`, async () => {
            const contract = await factory.attach(contractAddress);

            const info = await contract.getContractInfo();
            
            expect(info.admin).to.equal(creator.address);
            expect(info.bind_name).to.equal(ContractTestConfig.INIT_ARGS.bind_name);
            expect(info.contract_name).to.equal(ContractTestConfig.INIT_ARGS.contract_name);
            expect(info.version).to.equal(ContractTestConfig.HELLO_WORLD.INSTANCE_1.VERSION);
            expect(info.contract_version).to.equal(ContractTestConfig.HELLO_WORLD.INSTANCE_1.VERSION);
            expect(info.contract_type).to.equal(ContractTestConfig.HELLO_WORLD.INSTANCE_1.TYPE);
        });

        it(`Queries 'getMessage' function for first message`, async () => {
            const contract = await factory.attach(contractAddress);
            
            const msg = await contract.getMessage({
                id: ContractTestConfig.MESSAGE_ID_1
            });
            
            expect(msg.id).to.equal(ContractTestConfig.MESSAGE_ID_1);
            expect(msg.message).to.equal('Hello provenance!');
        });

        it(`Queries 'getMessage' function for second message`, async () => {
            const contract = await factory.attach(contractAddress);
            
            const msg = await contract.getMessage({
                id: ContractTestConfig.MESSAGE_ID_2
            });
            
            expect(msg.id).to.equal(ContractTestConfig.MESSAGE_ID_2);
            expect(msg.message).to.equal('Goodbye, cruel world.');
        });

        it(`Queries 'getMessage' function for third message`, async () => {
            const contract = await factory.attach(contractAddress);
            
            const msg = await contract.getMessage({
                id: ContractTestConfig.MESSAGE_ID_3
            });
            
            expect(msg.id).to.equal(ContractTestConfig.MESSAGE_ID_3);
            expect(msg.message).to.equal(ContractTestConfig.CUSTOM_MESSAGE);
        });

    });

    describe('Migrate Functions', function () {

        it(`Cannot migrate a contract from a non-admin signer`, async () => {
            const contract = (await factory.attach(contractAddress)).connect(user);

            expect(contract.migrate(migrateCodeId).broadcastTx(user)).to.eventually.be.rejected;
        });

        /* TODO: AssertionError: expected '0.1.0' to equal '0.1.1'
        it(`Migrates a contract to another version`, async () => {
            const contract = (await factory.attach(contractAddress)).connect(creator);

            const txRes = await contract.migrate(migrateCodeId).broadcastTx(creator);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            const info = await contract.getContractInfo();
            
            expect(info.admin).to.equal(creator.address);
            expect(info.bind_name).to.equal(ContractTestConfig.INIT_ARGS.bind_name);
            expect(info.contract_name).to.equal(ContractTestConfig.INIT_ARGS.contract_name);
            expect(info.version).to.equal(ContractTestConfig.HELLO_WORLD.INSTANCE_2.VERSION);
            expect(info.contract_version).to.equal(ContractTestConfig.HELLO_WORLD.INSTANCE_2.VERSION);
            expect(info.contract_type).to.equal(ContractTestConfig.HELLO_WORLD.INSTANCE_2.TYPE);
        });
        */

    });

    // clean-up after the tests run
    after(async () => {

        // stop and reset the localnet blockchain
        await cavendish.stopAndReset();

    });

});
