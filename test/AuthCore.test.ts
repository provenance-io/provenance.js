import { assert, expect } from 'chai';
import { Cavendish } from '@provenanceio/cavendish';
import { MockProvider } from './mock/MockProvider';

import { 
    ProvenanceClient,
    Wallet, 
} from '../src';

const AuthCoreTestConfig = {
    BIP39_MNEMONIC: 'name broom medal pen slogan blush version banana message grant all decline weekend rhythm near art imitate milk winter clap awesome green soccer beauty'
};

describe('AuthCore', function () {

    this.timeout(15000);

    const cavendish = new Cavendish();

    const provider = new MockProvider();
    const client = new ProvenanceClient(provider);

    const wallet = Wallet.fromMnemonic(AuthCoreTestConfig.BIP39_MNEMONIC, false);

    before(async () => {

        // start the localnet blockchain
        await cavendish.start({
            mnemonic: AuthCoreTestConfig.BIP39_MNEMONIC,
            accounts: 1
        });

    });

    describe('#getBaseAccount', function () {

        // TODO

    });

    describe('#getMarkerAccount', function () {

        // TODO

    });

    // clean-up after the tests run
    after(async () => {

        // stop and reset the localnet blockchain
        await cavendish.stopAndReset();

    });

});
