import { assert, expect } from 'chai';
import { MockProvider } from './mock/MockProvider';

import * as _ from 'lodash';

import { 
    AttributeType,
    BroadcastMode,
    ProvenanceClient, 
    Wallet 
} from '../src';

const AttributeModuleTestConfig = {
    BIP39_MNEMONIC: 'name broom medal pen slogan blush version banana message grant all decline weekend rhythm near art imitate milk winter clap awesome green soccer beauty',

    ATTRIBUTE_ROOT_NAME: 'attr.test.pb',

    JSON_ATTRIBUTE: {
        NAME: 'json.attr.test.pb',
        VALUE: { isObject: true, name: 'JSON object' },
        UPDATED_VALUE: { isObject: true, name: 'Updated JSON object' },
    },
    STRING_ATTRIBUTE: {
        NAME: 'string.attr.test.pb',
        VALUE: 'Test string value',
        UPDATED_VALUE: 'Updated test string value',
    },

};

describe('AttributeModule', function () {

    this.timeout(15000);

    const provider = new MockProvider();
    const client = new ProvenanceClient(provider);

    const wallet = Wallet.fromMnemonic(AttributeModuleTestConfig.BIP39_MNEMONIC, false);

    const owner = wallet.getKey(0, 0);
    const account1 = wallet.getKey(0, 1);
    const account2 = wallet.getKey(0, 2);

    before(async () => {

        const txRes = await client.constructEstimateAndBroadcastTx([
            await client.name.bindNamePath(AttributeModuleTestConfig.ATTRIBUTE_ROOT_NAME, owner.address),
            client.name.bindName(AttributeModuleTestConfig.JSON_ATTRIBUTE.NAME.split('.')[0], AttributeModuleTestConfig.ATTRIBUTE_ROOT_NAME, owner.address),
            client.name.bindName(AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME.split('.')[0], AttributeModuleTestConfig.ATTRIBUTE_ROOT_NAME, owner.address),
        ], () => { return true; }, [owner], BroadcastMode.BROADCAST_MODE_BLOCK);

        expect(txRes.code).to.equal(0);
        expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

    });

    describe('#addAttribute', function () {

        it(`Adds a JSON attribute to an account`, async () => {
            const txRes = await client.attribute.addAttribute(
                account1.address, 
                AttributeType.ATTRIBUTE_TYPE_JSON, 
                AttributeModuleTestConfig.JSON_ATTRIBUTE.NAME, 
                AttributeModuleTestConfig.JSON_ATTRIBUTE.VALUE,
                owner.address
            ).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Adds a string attribute to an account`, async () => {
            const txRes = await client.attribute.addAttribute(
                account1.address, 
                AttributeType.ATTRIBUTE_TYPE_STRING, 
                AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME, 
                AttributeModuleTestConfig.STRING_ATTRIBUTE.VALUE,
                owner.address
            ).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });
    
    });

    describe('#getAccountAttributesByName', function () {

        it(`Locates a JSON attribute on an account by name`, async () => {
            const attrs = await client.attribute.getAccountAttributesByName(account1.address, AttributeModuleTestConfig.JSON_ATTRIBUTE.NAME);
            expect(attrs.length).to.equal(1);

            const attr = attrs[0];
            expect(attr.name).to.equal(AttributeModuleTestConfig.JSON_ATTRIBUTE.NAME);
            expect(attr.address).to.equal(account1.address);
            expect(attr.attributeType).to.equal(AttributeType.ATTRIBUTE_TYPE_JSON);
            expect(_.isEqual(attr.jsonValue, AttributeModuleTestConfig.JSON_ATTRIBUTE.VALUE)).to.equal(true);
        });

        it(`Locates a string attribute on an account by name`, async () => {
            const attrs = await client.attribute.getAccountAttributesByName(account1.address, AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME);
            expect(attrs.length).to.equal(1);

            const attr = attrs[0];
            expect(attr.name).to.equal(AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME);
            expect(attr.address).to.equal(account1.address);
            expect(attr.attributeType).to.equal(AttributeType.ATTRIBUTE_TYPE_STRING);
            expect(attr.stringValue).to.equal(AttributeModuleTestConfig.STRING_ATTRIBUTE.VALUE);
        });

        it(`Cannot locate an attribute that has not been added to an account`, async () => {
            const attrs = await client.attribute.getAccountAttributesByName(account2.address, AttributeModuleTestConfig.JSON_ATTRIBUTE.NAME);
            expect(attrs.length).to.equal(0);
        });

    });

    describe('#getAllAccountAttributes', function () {

        it(`Locates all attributes on an account`, async () => {
            const attrs = await client.attribute.getAllAccountAttributes(account1.address);
            expect(attrs.length).to.equal(2);
        });

        it(`Returns an empty list of attributes on an account without attributes`, async () => {
            const attrs = await client.attribute.getAllAccountAttributes(account2.address);
            expect(attrs.length).to.equal(0);
        });

    });

    describe('#scanAccountAttributesByNameSuffix', function () {

        it(`Locates attributes on an account by suffix`, async () => {
            const attrs = await client.attribute.scanAccountAttributesByNameSuffix(account1.address, AttributeModuleTestConfig.ATTRIBUTE_ROOT_NAME);
            expect(attrs.length).to.equal(2);
        });

        it(`Returns an empty list of attributes on an account without attributes`, async () => {
            const attrs = await client.attribute.scanAccountAttributesByNameSuffix(account2.address, AttributeModuleTestConfig.ATTRIBUTE_ROOT_NAME);
            expect(attrs.length).to.equal(0);
        });

    });

    describe('#updateAttribute', function () {

        it(`Cannot update an attribute that has not been added to an account`, async () => {
            await client.attribute.updateAttribute(
                account2.address, // this account doesn't have the attribute
                AttributeModuleTestConfig.JSON_ATTRIBUTE.NAME,
                AttributeType.ATTRIBUTE_TYPE_JSON,
                AttributeType.ATTRIBUTE_TYPE_JSON,
                AttributeModuleTestConfig.JSON_ATTRIBUTE.VALUE,
                AttributeModuleTestConfig.JSON_ATTRIBUTE.UPDATED_VALUE,
                owner.address
            ).broadcastTx(owner).then((txRes) => {
                assert.fail(`Unexpected success: Should not be able to update an attribute that doesn't exist`);
            }).catch((err) => {
                expect(err.message).to.contain('no attributes updated with name');
            });
        });

        it(`Updates a JSON attribute on an account`, async () => {
            const txRes = await client.attribute.updateAttribute(
                account1.address,
                AttributeModuleTestConfig.JSON_ATTRIBUTE.NAME,
                AttributeType.ATTRIBUTE_TYPE_JSON,
                AttributeType.ATTRIBUTE_TYPE_JSON,
                AttributeModuleTestConfig.JSON_ATTRIBUTE.VALUE,
                AttributeModuleTestConfig.JSON_ATTRIBUTE.UPDATED_VALUE,
                owner.address
            ).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            const attrs = await client.attribute.getAccountAttributesByName(account1.address, AttributeModuleTestConfig.JSON_ATTRIBUTE.NAME);
            expect(attrs.length).to.equal(1);

            const attr = attrs[0];
            expect(attr.name).to.equal(AttributeModuleTestConfig.JSON_ATTRIBUTE.NAME);
            expect(attr.address).to.equal(account1.address);
            expect(attr.attributeType).to.equal(AttributeType.ATTRIBUTE_TYPE_JSON);
            expect(_.isEqual(attr.jsonValue, AttributeModuleTestConfig.JSON_ATTRIBUTE.UPDATED_VALUE)).to.equal(true);
        });

        it(`Updates a string attribute on an account`, async () => {
            const txRes = await client.attribute.updateAttribute(
                account1.address,
                AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME,
                AttributeType.ATTRIBUTE_TYPE_STRING,
                AttributeType.ATTRIBUTE_TYPE_STRING,
                AttributeModuleTestConfig.STRING_ATTRIBUTE.VALUE,
                AttributeModuleTestConfig.STRING_ATTRIBUTE.UPDATED_VALUE,
                owner.address
            ).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            const attrs = await client.attribute.getAccountAttributesByName(account1.address, AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME);
            expect(attrs.length).to.equal(1);

            const attr = attrs[0];
            expect(attr.name).to.equal(AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME);
            expect(attr.address).to.equal(account1.address);
            expect(attr.attributeType).to.equal(AttributeType.ATTRIBUTE_TYPE_STRING);
            expect(attr.stringValue).to.equal(AttributeModuleTestConfig.STRING_ATTRIBUTE.UPDATED_VALUE);
        });

        it(`Updates the type of an attribute from string to JSON on an account`, async () => {
            const txRes = await client.attribute.updateAttribute(
                account1.address,
                AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME,
                AttributeType.ATTRIBUTE_TYPE_STRING,
                AttributeType.ATTRIBUTE_TYPE_JSON,
                AttributeModuleTestConfig.STRING_ATTRIBUTE.UPDATED_VALUE,
                AttributeModuleTestConfig.JSON_ATTRIBUTE.UPDATED_VALUE,
                owner.address
            ).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            const attrs = await client.attribute.getAccountAttributesByName(account1.address, AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME);
            expect(attrs.length).to.equal(1);

            const attr = attrs[0];
            expect(attr.name).to.equal(AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME);
            expect(attr.address).to.equal(account1.address);
            expect(attr.attributeType).to.equal(AttributeType.ATTRIBUTE_TYPE_JSON);
            expect(_.isEqual(attr.jsonValue, AttributeModuleTestConfig.JSON_ATTRIBUTE.UPDATED_VALUE)).to.equal(true);
        });

        it(`Updates the type of an attribute from JSON to string on an account`, async () => {
            const txRes = await client.attribute.updateAttribute(
                account1.address,
                AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME,
                AttributeType.ATTRIBUTE_TYPE_JSON,
                AttributeType.ATTRIBUTE_TYPE_STRING,
                AttributeModuleTestConfig.JSON_ATTRIBUTE.UPDATED_VALUE,
                AttributeModuleTestConfig.STRING_ATTRIBUTE.UPDATED_VALUE,
                owner.address
            ).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            const attrs = await client.attribute.getAccountAttributesByName(account1.address, AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME);
            expect(attrs.length).to.equal(1);

            const attr = attrs[0];
            expect(attr.name).to.equal(AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME);
            expect(attr.address).to.equal(account1.address);
            expect(attr.attributeType).to.equal(AttributeType.ATTRIBUTE_TYPE_STRING);
            expect(attr.stringValue).to.equal(AttributeModuleTestConfig.STRING_ATTRIBUTE.UPDATED_VALUE);
        });

    });

    describe('#deleteAttribute', function () {

        it(`Cannot delete an attribute that has not been added to an account`, async () => {
            await client.attribute.deleteAttribute(
                account2.address, // this account doesn't have the attribute
                AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME,
                owner.address
            ).broadcastTx(owner).then((txRes) => {
                assert.fail(`Unexpected success: Should not be able to delete an attribute that doesn't exist`);
            }).catch((err) => {
                expect(err.message).to.contain('no keys deleted with name');
            });
        });

        it(`Deletes an attribute on an account`, async () => {
            const txRes = await client.attribute.deleteAttribute(
                account1.address,
                AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME,
                owner.address
            ).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            const attrs = await client.attribute.getAccountAttributesByName(account1.address, AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME);
            expect(attrs.length).to.equal(0);
        });

        // re-create it for the #deleteDistinctAttribute tests
        after(async () => {

            const txRes = await client.attribute.addAttribute(
                account1.address, 
                AttributeType.ATTRIBUTE_TYPE_STRING, 
                AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME, 
                AttributeModuleTestConfig.STRING_ATTRIBUTE.UPDATED_VALUE,
                owner.address
            ).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

        });

    });

    describe('#deleteDistinctAttribute', function () {

        it(`Cannot delete a distinct attribute on an account when the value does not match`, async () => {
            await client.attribute.deleteDistinctAttribute(
                account1.address,
                AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME, 
                AttributeModuleTestConfig.STRING_ATTRIBUTE.VALUE, // value should be AttributeModuleTestConfig.STRING_ATTRIBUTE.UPDATED_VALUE
                owner.address
            ).broadcastTx(owner).then((txRes) => {
                assert.fail(`Unexpected success: Should not be able to delete a distinct attribute when the value does not match`);
            }).catch((err) => {
                expect(err.message).to.contain('no keys deleted with name');
            });
        });

        it(`Cannot delete a distinct attribute that has not been added to an account`, async () => {
            const txRes = await client.attribute.deleteDistinctAttribute(
                account2.address, // this account doesn't have the attribute
                AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME, 
                AttributeModuleTestConfig.STRING_ATTRIBUTE.VALUE,
                owner.address
            ).broadcastTx(owner).then((txRes) => {
                assert.fail(`Unexpected success: Should not be able to delete a distinct attribute that doesn't exist`);
            }).catch((err) => {
                expect(err.message).to.contain('no keys deleted with name');
            });
        });

        it(`Deletes a distinct JSON attribute on an account`, async () => {
            const txRes = await client.attribute.deleteDistinctAttribute(
                account1.address,
                AttributeModuleTestConfig.JSON_ATTRIBUTE.NAME, 
                AttributeModuleTestConfig.JSON_ATTRIBUTE.UPDATED_VALUE,
                owner.address
            ).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            const attrs = await client.attribute.getAccountAttributesByName(account1.address, AttributeModuleTestConfig.JSON_ATTRIBUTE.NAME);
            expect(attrs.length).to.equal(0);
        });

        it(`Deletes a distinct string attribute on an account`, async () => {
            const txRes = await client.attribute.deleteDistinctAttribute(
                account1.address,
                AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME, 
                AttributeModuleTestConfig.STRING_ATTRIBUTE.UPDATED_VALUE,
                owner.address
            ).broadcastTx(owner);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            const attrs = await client.attribute.getAccountAttributesByName(account1.address, AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME);
            expect(attrs.length).to.equal(0);
        });

    });

    // clean-up after the tests run
    after(async () => {

        const txRes = await client.constructEstimateAndBroadcastTx([
            client.name.deleteName(AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME, owner.address),
            client.name.deleteName(AttributeModuleTestConfig.JSON_ATTRIBUTE.NAME, owner.address),
            client.name.deleteNamePath(AttributeModuleTestConfig.ATTRIBUTE_ROOT_NAME, 2, owner.address),
        ], () => { return true; }, [owner], BroadcastMode.BROADCAST_MODE_BLOCK);

        expect(txRes.code).to.equal(0);
        expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

    });

});
