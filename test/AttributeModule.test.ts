import { assert, expect } from 'chai';
import { MockProvider } from './mock/MockProvider';

import { 
    AttributeType,
    NameRecord,
    ProvenanceClient, 
    Wallet 
} from '../src';

const AttributeModuleTestConfig = {
    BIP39_MNEMONIC: 'name broom medal pen slogan blush version banana message grant all decline weekend rhythm near art imitate milk winter clap awesome green soccer beauty',

    STRING_ATTRIBUTE: {
        NAME: 'string.test.attr.pb',
        VALUE: 'Test string value'
    },

};

describe('AttributeModule', function () {

    this.timeout(15000);

    const provider = new MockProvider();
    const client = new ProvenanceClient(provider);

    const wallet = Wallet.fromMnemonic(AttributeModuleTestConfig.BIP39_MNEMONIC, false);

    const owner = wallet.getKey(0, 0);
    const account = wallet.getKey(0, 1);

    before(async () => {
        await client.constructEstimateAndBroadcastTx(
            await client.name.bindNamePath(AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME, owner.address),
            (gasEstimate) => { return true; },
            [owner]
        ).then(() => {
            // TODO
        }).catch((err) => {
            assert.fail(`Unexpected error: ${err.message}`);
        });
    });

    describe('#addAttribute', function () {

        it(`Creates string attributes`, async () => {
            /*
            await client.constructEstimateAndBroadcastTx((msgs) => {
                msgs.push(
                    client.attribute.addAttribute(
                        account.address, 
                        AttributeType.ATTRIBUTE_TYPE_STRING, 
                        AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME, 
                        AttributeModuleTestConfig.STRING_ATTRIBUTE.VALUE,
                        owner.address
                    )
                );
            }, (gasEstimate) => {
                console.log(`gasEstimate=${gasEstimate}`);
                return true;
            }, [owner]).then(() => {
                client.attribute.getAccountAttributesByName(account.address, AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME).then((attributes) => {
                    expect(attributes.length).to.equal(1);

                    const STRING_ATTRIBUTE = attributes[0];
                    expect(STRING_ATTRIBUTE.address).to.equal(account.address);
                    expect(STRING_ATTRIBUTE.name).to.equal(AttributeModuleTestConfig.STRING_ATTRIBUTE.NAME);
                    expect(STRING_ATTRIBUTE.value).to.equal(AttributeModuleTestConfig.STRING_ATTRIBUTE.VALUE);
                }).catch((err) => {
                    assert.fail(`Unexpected error: ${err.message}`);
                });
            }).catch((err) => {
                assert.fail(`Unexpected error: ${err.message}`);
            });
            */
        });
    
    });

    describe('#updateAttribute', function () {

        // TODO

    });

    describe('#deleteAttribute', function () {

        // TODO

    });

    describe('#deleteDistinctAttribute', function () {

        // TODO

    });

});
