import { expect, use } from 'chai';
import chaiAsPromise from 'chai-as-promised';
import { Cavendish } from '@provenanceio/cavendish';

import { MockProvider } from './mock/MockProvider';

import { 
    ProvenanceClient,
    Wallet ,
} from '../src';

const NameModuleTestConfig = {
    BIP39_MNEMONIC: 'name broom medal pen slogan blush version banana message grant all decline weekend rhythm near art imitate milk winter clap awesome green soccer beauty',

    ROOT_NAME: 'pb',
    
    BINDNAME_TEST_NAME_1: 'test1',
    BINDNAME_TEST_NAME_2: 'test2',
    BINDNAME_TEST_NAME_3: 'test3',
    BINDNAME_TEST_NAME_4: 'test4',

    BINDPATH_TEST_PATH_BAD: 'name.path.test.blerg',
    BINDPATH_TEST_PATH_GOOD: 'name.path.test.pb'
};

use(chaiAsPromise);

describe('NameModule', function () {

    this.timeout(30000);

    const cavendish = new Cavendish();

    const provider = new MockProvider();
    const client = new ProvenanceClient(provider);

    const wallet = Wallet.fromMnemonic(NameModuleTestConfig.BIP39_MNEMONIC, false);
    const owner = wallet.getKey(0, 0);
    const nonOwner = wallet.getKey(0, 1);

    before(async () => {

        // start the localnet blockchain
        await cavendish.start({
            mnemonic: NameModuleTestConfig.BIP39_MNEMONIC,
            accounts: 2
        });

    });

    describe('#bindName', function () {

        it(`Cannot bind name without parent`, async () => {
            expect(client.name.bindName(
                NameModuleTestConfig.BINDNAME_TEST_NAME_1,
                '',
                owner.address
            ).broadcastTx(owner)).to.eventually.be.rejected;
        });

        it(`Binds name using (string, string, string)`, async () => {
            const txRes = await client.name.bindName(
                NameModuleTestConfig.BINDNAME_TEST_NAME_1,
                NameModuleTestConfig.ROOT_NAME,
                owner.address
            ).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Binds name using (NameRecord, string, string)`, async () => {
            const txRes = await client.name.bindName({
                    name: NameModuleTestConfig.BINDNAME_TEST_NAME_2,
                    address: owner.address,
                    restricted: false
                },
                NameModuleTestConfig.ROOT_NAME,
                owner.address
            ).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Binds name using (string, NameRecord, string)`, async () => {
            const txRes = await client.name.bindName(
                NameModuleTestConfig.BINDNAME_TEST_NAME_3, {
                    name: NameModuleTestConfig.ROOT_NAME,
                    address: owner.address,
                    restricted: false
                },
                owner.address
            ).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Binds name using (NameRecord, NameRecord)`, async () => {
            const txRes = await client.name.bindName({
                    name: NameModuleTestConfig.BINDNAME_TEST_NAME_4,
                    address: owner.address,
                    restricted: false
                }, {
                    name: NameModuleTestConfig.ROOT_NAME,
                    address: owner.address,
                    restricted: false
                }
            ).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

    });

    describe('#bindNamePath', function () {

        it(`Cannot bind name path without parent`, async () => {
            expect((await client.name.bindNamePath(
                NameModuleTestConfig.BINDPATH_TEST_PATH_BAD, 
                owner.address
            )).broadcastTx(owner)).to.eventually.be.rejected;
        });

        it(`Binds name path`, async () => {
            const txRes = await (await client.name.bindNamePath(
                NameModuleTestConfig.BINDPATH_TEST_PATH_GOOD, 
                owner.address
            )).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

    });

    describe('#deleteName', function () {

        it(`Deletes a bound name`, async () => {
            const txRes = await client.name.deleteName(
                `${NameModuleTestConfig.BINDNAME_TEST_NAME_1}.${NameModuleTestConfig.ROOT_NAME}`,
                owner.address
            ).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Cannot delete an unbound name`, async () => {
            expect(client.name.deleteName(
                NameModuleTestConfig.BINDNAME_TEST_NAME_1,
                owner.address
            ).broadcastTx(owner)).to.eventually.be.rejected;
        });

    });

    describe('#deleteNamePath', function () {

        it(`Deletes name path`, async () => {
            const txRes = await (await client.name.deleteNamePath(
                NameModuleTestConfig.BINDPATH_TEST_PATH_GOOD, 
                3, 
                owner.address
            )).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

    });

    describe('#lookupNamesForAddress', function () {

        it(`Returns empty list for address with no bound names`, async () => {
            const names = await client.name.lookupNamesForAddress(nonOwner.address);
            expect(names.length).to.equal(0);
        });

        it(`Locates names bound to an address`, async () => {
            const names = await client.name.lookupNamesForAddress(owner.address);
            expect(names.length).to.equal(3);
            expect(names).contains(`${NameModuleTestConfig.BINDNAME_TEST_NAME_2}.${NameModuleTestConfig.ROOT_NAME}`);
            expect(names).contains(`${NameModuleTestConfig.BINDNAME_TEST_NAME_3}.${NameModuleTestConfig.ROOT_NAME}`);
            expect(names).contains(`${NameModuleTestConfig.BINDNAME_TEST_NAME_4}.${NameModuleTestConfig.ROOT_NAME}`);
        });

    });

    describe('#resolveName', function () {

        it(`Cannot resolve an unbound name`, async () => {
            expect(client.name.resolveName(`${NameModuleTestConfig.BINDNAME_TEST_NAME_1}.${NameModuleTestConfig.ROOT_NAME}`)).to.eventually.be.rejected;
        });

        it(`Resolves a bound name`, async () => {
            const addr = await client.name.resolveName(`${NameModuleTestConfig.BINDNAME_TEST_NAME_2}.${NameModuleTestConfig.ROOT_NAME}`);
            expect(addr).to.equal(owner.address);
        });

    });

    // clean-up after the tests run
    after(async () => {

        // stop and reset the localnet blockchain
        await cavendish.stopAndReset();

    });

});
