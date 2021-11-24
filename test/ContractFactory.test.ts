import { expect, use } from 'chai';
import chaiAsPromise from 'chai-as-promised';
import { createHash } from 'crypto';
import { 
    existsSync,
    readFileSync,
} from 'fs';
import * as path from 'path';

import { Cavendish } from '@provenanceio/cavendish';
import { MockProvider } from './mock/MockProvider';

import { 
    Contract,
    ContractFactory,
    ProvenanceClient,
    Wallet, 
} from '../src';

const ContractFactoryTestConfig = {
    BIP39_MNEMONIC: 'name broom medal pen slogan blush version banana message grant all decline weekend rhythm near art imitate milk winter clap awesome green soccer beauty',

    HELLO_WORLD: {
        WASM_FILE: './test/contract/hello_world_v0.1.0/hello_world.wasm',
        SCHEMA_FILES: [
            './test/contract/hello_world_v0.1.0/schema/contract_info.json',
            './test/contract/hello_world_v0.1.0/schema/execute_msg.json',
            './test/contract/hello_world_v0.1.0/schema/instantiate_msg.json',
            './test/contract/hello_world_v0.1.0/schema/message_state.json',
            './test/contract/hello_world_v0.1.0/schema/migrate_msg.json',
            './test/contract/hello_world_v0.1.0/schema/query_msg.json',
        ],
    },
};

use(chaiAsPromise);

describe('ContractFactory', function () {

    this.timeout(30000);

    const cavendish = new Cavendish();

    const provider = new MockProvider();
    const client = new ProvenanceClient(provider);

    const wallet = Wallet.fromMnemonic(ContractFactoryTestConfig.BIP39_MNEMONIC, false);
    const creator = wallet.getKey(0, 0);
    const admin = wallet.getKey(0, 1);

    var wasmBytecode: Buffer;
    var schemas: string[] = [];

    var codeId: number;

    var contract1: Contract;
    var contract2: Contract;

    // start localnet blockchain before the tests run
    before(async () => {

        // load the hello_world v0.1.0 contract bytecode
        const wasmFile = path.join(process.cwd(), ContractFactoryTestConfig.HELLO_WORLD.WASM_FILE);
        expect(existsSync(wasmFile)).to.equal(true);
        wasmBytecode = readFileSync(wasmFile);

        // load the hello_world v0.1.0 schemas
        ContractFactoryTestConfig.HELLO_WORLD.SCHEMA_FILES.forEach((schemaFile) => {
            const file = path.join(process.cwd(), schemaFile);
            expect(existsSync(file)).to.equal(true);
            schemas.push(readFileSync(file).toString('utf-8'));
        });

        // start the localnet blockchain
        await cavendish.start({
            mnemonic: ContractFactoryTestConfig.BIP39_MNEMONIC,
            accounts: 2,
            rootNames: [
                { name: 'pb', restrict: false },
                { name: 'sc.pb', restrict: false },
            ]
        }, {
            background: true,
            force: true
        });

    });

    describe('#connect', function () {

        it(`Returns a new instance of the ContractFactory with a new signer`, async () => {
            const factory = new ContractFactory(wasmBytecode, schemas, creator);
            const newFactory = factory.connect(admin);

            expect(newFactory.signer.address).to.equal(admin.address);
            
            const factoryBytecodeHash = createHash('sha256').update(factory.bytecode).digest().toString('hex');
            const newFactoryBytecodeHash = createHash('sha256').update(newFactory.bytecode).digest().toString('hex');
            expect(newFactoryBytecodeHash).to.equal(factoryBytecodeHash);
        });

    });

    describe('#store', function () {

        it(`Stores the bytecode of a contract`, async () => {
            const factory = new ContractFactory(wasmBytecode, schemas, creator);
            codeId = await factory.store();
            
            expect(codeId).to.be.greaterThan(0);
        });

    });

    describe('#deployFromCodeId', function () {

        it(`Deploys a smart contract from a stored contract using the code id`, async () => {
            const factory = new ContractFactory(wasmBytecode, schemas, creator);
            contract1 = await factory.deployFromCodeId('hw-test-1', codeId, {
                "bind_name": "hello-1.sc.pb",
                "contract_name": "hello_world",
            });
        })

    });

    describe('#deploy', function () {

        it(`Deploys a smart contract`, async () => {
            const factory = new ContractFactory(wasmBytecode, schemas, creator);
            contract2 = await factory.deploy('hw-test-2', {
                "bind_name": "hello-2.sc.pb",
                "contract_name": "hello_world",
            });
        })

    });

    describe('#attach', function () {

        it(`Attaches to an existing contract`, async () => {
            const factory = new ContractFactory(wasmBytecode, schemas, creator);
            const contract = await factory.attach(contract1.address);

            expect(contract.address).to.equal(contract1.address);
        });

    });

    describe('#attachByName', function () {

        it(`Cannot attach to a contract using an unbound name`, async () => {
            const factory = new ContractFactory(wasmBytecode, schemas, creator);
            expect(factory.attachByName('invalid-name.sc.pb')).to.eventually.be.rejected;
        });

        it(`Attaches to a contract by name`, async () => {
            const factory = new ContractFactory(wasmBytecode, schemas, creator);
            const contract = await factory.attachByName('hello-2.sc.pb');

            expect(contract.address).to.equal(contract2.address);
        });

    });

    // clean-up after the tests run
    after(async () => {

        // stop and reset the localnet blockchain
        await cavendish.stopAndReset();

    });

});
