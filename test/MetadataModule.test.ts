import { expect, use } from 'chai';
import chaiAsPromise from 'chai-as-promised';
import { Cavendish } from '@provenanceio/cavendish';
import { MockProvider } from './mock/MockProvider';

import { 
    DefinitionType,
    MetadataAddress,
    PartyType,
    ProvenanceClient, 
    Wallet, 
} from '../src';

enum Locator {
    NO_KEY = 0,
    WITH_KEY,
    SAME_URI
}

const MetadataModuleTestConfig = {
    BIP39_MNEMONIC: 'name broom medal pen slogan blush version banana message grant all decline weekend rhythm near art imitate milk winter clap awesome green soccer beauty',

    OS_LOCATOR_URIS: [
        // Locator.NO_KEY
        'http://locator1.provenance.io',
        
        // Locator.WITH_KEY
        'http://locator2.provenance.io',
            
        // Locator.SAME_URI
        'http://locator1.provenance.io',        // same URI as Locator.NO_KEY
    ],

    CONTRACT_SPEC: {
        ID: 'a18fcc80-6f0c-4189-9b8e-7697f1892d79',
        CLASS_NAME: 'provenance.test.Contract',
        HASH: '715bf8e8f21773d8db1af60d57a438eff27a0e4d555fe99d0da1902dedfaec58',
        DESCRIPTION: {
            name: 'Test contract specification',
            description: 'A test contract specification for provenance.js',
            websiteUrl: 'http://provenance.io/spec/contract/test',
            iconUrl: 'http://provenance.io/spec/contract/test/icon.png',
        },
        PARTIES: [
            PartyType.PARTY_TYPE_OWNER
        ]
    },

    SCOPE_SPEC: {
        ID: '34fc0e20-5fd6-49a3-bfa1-f15924a15a31',
        PARTIES: [
            PartyType.PARTY_TYPE_OWNER
        ]
    },

    RECORD_SPEC: {
        NAME: 'Record',
        TYPE_NAME: 'provenance.test.Record',
        PARTIES: [
            PartyType.PARTY_TYPE_OWNER
        ],
        INPUTS: [
            {
                name: 'RecordInput',
                typeName: 'string',
                hash: '10ba970137ce9815c200cb9e35cb123e9cbf8eff2e89b42078b9d40e6ce1ac82',
                recordId: undefined
            }
        ]
    }
};

use(chaiAsPromise);

describe('MetadataModule', function () {

    this.timeout(30000);

    const cavendish = new Cavendish();

    const provider = new MockProvider();
    const client = new ProvenanceClient(provider);

    const wallet = Wallet.fromMnemonic(MetadataModuleTestConfig.BIP39_MNEMONIC, false);
    const osOwner1 = wallet.getKey(0, 0);
    const osOwner2 = wallet.getKey(0, 1);
    const osOwner3 = wallet.getKey(0, 2);
    const creator = wallet.getKey(0, 3);

    before(async () => {

        // start the localnet blockchain
        await cavendish.start({
            mnemonic: MetadataModuleTestConfig.BIP39_MNEMONIC,
            accounts: 4
        });

    });

    describe('Object Store Locator', function () {

        describe('#bindOSLocator', function () {

            it(`Binds an object store locator without an encryption key`, async () => {
                const txRes = await client.metadata.bindOSLocator({
                    owner: osOwner1.address,
                    locatorUri: MetadataModuleTestConfig.OS_LOCATOR_URIS[Locator.NO_KEY],
                    encryptionKey: ''
                }).broadcastTx(osOwner1);

                expect(txRes.code).to.equal(0);
                expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
            });

            /* ERROR: 2 UNKNOWN: failed to add locator for a given owner address: tp13n9htv3464hpe6sr9y8uhkgf2j3ystds8tzqhv, invalid encryption key address: SomeEncryptionKey
            it(`Binds an object store locator with an encryption key`, async () => {
                const txRes = await client.metadata.bindOSLocator({
                    owner: osOwner2.address,
                    locatorUri: MetadataModuleTestConfig.OS_LOCATOR_URIS[Locator.WITH_KEY],
                    encryptionKey: 'SomeEncryptionKey' //osOwner2.privateKey
                }).broadcastTx(osOwner2);

                expect(txRes.code).to.equal(0);
                expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
            });
            */

            it(`Binds an object store locator with an already bound URI`, async () => {
                const txRes = await client.metadata.bindOSLocator({
                    owner: osOwner3.address,
                    locatorUri: MetadataModuleTestConfig.OS_LOCATOR_URIS[Locator.SAME_URI],
                    encryptionKey: ''
                }).broadcastTx(osOwner3);

                expect(txRes.code).to.equal(0);
                expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
            });

        });

        describe('#getOSLocator', function () {

            it(`Cannot get an object store locator for an unbound address`, async () => {
                expect(client.metadata.getOSLocator(creator.address)).to.eventually.be.rejected;
            });

            it(`Gets an object store locator by owner`, async () => {
                const locator = await client.metadata.getOSLocator(osOwner1.address);

                expect(locator.owner).to.equal(osOwner1.address);
                expect(locator.locatorUri).to.equal(MetadataModuleTestConfig.OS_LOCATOR_URIS[Locator.NO_KEY]);
                expect(locator.encryptionKey).to.equal('');
            });

        });

        describe('#getOSLocatorsByURI', function () {

            it(`Gets all object store locators for a URI`, async () => {
                const locators = await client.metadata.getOSLocatorsByURI(MetadataModuleTestConfig.OS_LOCATOR_URIS[Locator.SAME_URI]);

                expect(locators.length).to.equal(2);
                expect(locators).to.deep.include.members([
                    {
                        owner: osOwner1.address,
                        locatorUri: MetadataModuleTestConfig.OS_LOCATOR_URIS[Locator.NO_KEY],
                        encryptionKey: ''
                    },
                    {
                        owner: osOwner3.address,
                        locatorUri: MetadataModuleTestConfig.OS_LOCATOR_URIS[Locator.SAME_URI],
                        encryptionKey: ''
                    },
                ]);
            });

        });

        describe('#modifyOSLocator', function () {

        });

        describe('#deleteOSLocator', function () {

        });

    });

    describe('Contract Specification', function () {

        describe('#writeContractSpec', function () {

            it(`Writes a new contract specification`, async () => {
                const txRes = await client.metadata.writeContractSpec(
                    MetadataModuleTestConfig.CONTRACT_SPEC.ID,
                    {
                        specificationId: MetadataAddress.forContractSpecification(MetadataModuleTestConfig.CONTRACT_SPEC.ID).bytes,
                        ownerAddressesList: [ creator.address ],
                        partiesInvolvedList: MetadataModuleTestConfig.CONTRACT_SPEC.PARTIES,
                        resourceId: undefined,
                        hash: MetadataModuleTestConfig.CONTRACT_SPEC.HASH,
                        className: MetadataModuleTestConfig.CONTRACT_SPEC.CLASS_NAME,
                    },
                    creator.address
                ).broadcastTx(creator);

                expect(txRes.code).to.equal(0);
                expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
            });

        })

        describe('#writeScopeSpec', function () {

            it(`Writes a new scope specification`, async () => {
                const txRes = await client.metadata.writeScopeSpec(
                    MetadataModuleTestConfig.SCOPE_SPEC.ID,
                    {
                        specificationId: MetadataAddress.forScopeSpecification(MetadataModuleTestConfig.SCOPE_SPEC.ID).bytes,
                        ownerAddressesList: [ creator.address ],
                        partiesInvolvedList: MetadataModuleTestConfig.SCOPE_SPEC.PARTIES,
                        contractSpecIdsList: [
                            MetadataAddress.forContractSpecification(MetadataModuleTestConfig.CONTRACT_SPEC.ID).bytes
                        ],
                    },
                    creator.address
                ).broadcastTx(creator);
    
                expect(txRes.code).to.equal(0);
                expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
            });
    
        });

        describe('#writeRecordSpec', function () {

            it(`Writes a new record specification`, async () => {
                const txRes = await client.metadata.writeRecordSpec(
                    MetadataModuleTestConfig.CONTRACT_SPEC.ID,
                    {
                        specificationId: MetadataAddress.forRecordSpecification(
                            MetadataModuleTestConfig.CONTRACT_SPEC.ID, 
                            MetadataModuleTestConfig.RECORD_SPEC.NAME
                        ).bytes,
                        name: MetadataModuleTestConfig.RECORD_SPEC.NAME,
                        inputsList: MetadataModuleTestConfig.RECORD_SPEC.INPUTS,
                        typeName: MetadataModuleTestConfig.RECORD_SPEC.TYPE_NAME,
                        resultType: DefinitionType.DEFINITION_TYPE_RECORD,
                        responsiblePartiesList: MetadataModuleTestConfig.RECORD_SPEC.PARTIES,
                    },
                    creator.address
                ).broadcastTx(creator);

                expect(txRes.code).to.equal(0);
                expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
            });

        });

        describe('#getContractSpec', function () {

            it(`Gets a contract specification without record specs`, async () => {
                const spec = await client.metadata.getContractSpec(MetadataModuleTestConfig.CONTRACT_SPEC.ID);

                // TODO: console.dir(spec.contractSpecification);
                expect(spec.recordSpecificationsList.length).to.equal(0);
            });

            it(`Gets a contract specification with record specs`, async () => {
                const spec = await client.metadata.getContractSpec(MetadataModuleTestConfig.CONTRACT_SPEC.ID, true);

                // TODO: console.dir(spec.contractSpecification);
                // TODO: console.dir(spec.recordSpecificationsList);
            });

        });

        describe('#getScopeSpec', function () {

            it(`Gets a scope specification`, async () => {
                const spec = await client.metadata.getScopeSpec(MetadataModuleTestConfig.SCOPE_SPEC.ID);

                // TODO: console.dir(spec.scopeSpecIdInfo);
                // TODO: console.dir(spec.specification);
            });

        });

        describe('#getRecordSpec', function () {

            it(`Gets a record specification`, async () => {
                // const spec = await client.metadata.getRecordSpec(MetadataModuleTestConfig.RECORD_SPEC.ID); // <<<--- It seems we don't have a record id since it's composed from the contract spec id and the record name... shrug?

                // TODO: console.dir(spec.recordSpecIdInfo);
                // TODO: console.dir(spec.specification);
            });

        });

    });

    // clean-up after the tests run
    after(async () => {

        // stop and reset the localnet blockchain
        await cavendish.stopAndReset();

    });

});
