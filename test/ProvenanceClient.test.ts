import { assert, expect, use } from 'chai';
import { MockProvider } from './mock/MockProvider';

import { 
    ProvenanceClient 
} from '../src';

describe('ProvenanceClient', function () {

    this.timeout(15000);

    const provider = new MockProvider();
    const client = new ProvenanceClient(provider);

    it(`Does a thing`, async () => {
        // TODO
    });

});
