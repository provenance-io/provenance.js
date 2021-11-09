import { assert, expect, use } from 'chai';
import { MockProvider } from './mock/MockProvider';

import { ProvenanceClient } from '../src/client/ProvenanceClient';

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
    });

});
