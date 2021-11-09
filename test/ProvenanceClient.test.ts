import { assert, expect, use } from 'chai';
import { MockProvider } from './mock/MockProvider';

import { ProvenanceClient } from '../src/client/ProvenanceClient';
import { AttributeType } from '../src/types';

describe('ProvenanceClient', function () {

    this.timeout(15000);

    const provider = new MockProvider();
    const client = new ProvenanceClient(provider);

    beforeEach(async () => {
        // TODO
    });

    it(`Does a thing`, async () => {
        /*
        try {
            const attrs = await client.attribute.getAccountAttributesByName('tp1aat3l2m362vyj74rhajr8yng8r05rvl3c0uxzn', 'test.name');
            expect(attrs.length).to.equal(0);
        } catch (ex) {
            assert(false, `Unexpected error: ${ex.message}`);
        }
        */

        /*
        try {
            const marker = await client.marker.getMarker('nhash');
            console.dir(marker);
        } catch (ex) {
            assert(false, `Unexpected error: ${ex.message}`);
        }

        try {
            const markers = await client.marker.getAllMarkers();
            console.dir(markers);
        } catch (ex) {
            assert(false, `Unexpected error: ${ex.message}`);
        }
        */

        const txBody = client.construct((msgs) => {
            const msg = client.attribute.addAttribute('tp1aat3l2m362vyj74rhajr8yng8r05rvl3c0uxzn', AttributeType.ATTRIBUTE_TYPE_STRING, 'test.name', 'test.value');
            console.dir(msg);
            console.dir(msg.toObject());
            msgs.push(msg);
        });

        console.dir(txBody);
        txBody.getMessagesList().forEach((msg) => {
            console.dir(msg.toObject());
        });
        console.dir(txBody.toObject());
    });

});
