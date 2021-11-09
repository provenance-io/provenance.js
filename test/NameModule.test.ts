import { assert, expect, use } from 'chai';
import { MockProvider } from './mock/MockProvider';

import { ProvenanceClient } from '../src/client/ProvenanceClient';

describe('NameModule', function () {

    this.timeout(15000);

    const provider = new MockProvider();
    const client = new ProvenanceClient(provider);

    beforeEach(async () => {
        // TODO
    });

    it(`Does a thing`, async () => {
        // TODO
    });

});
