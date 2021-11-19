import { assert, expect } from 'chai';
import { 
    MarkerAccess,
    Cavendish,
} from '@provenanceio/cavendish';
import { MockProvider } from './mock/MockProvider';

import { 
    MarkerType,
    ProvenanceClient,
    Wallet, 
} from '../src';

const BankCoreTestConfig = {
    BIP39_MNEMONIC: 'name broom medal pen slogan blush version banana message grant all decline weekend rhythm near art imitate milk winter clap awesome green soccer beauty',

    HASH: {
        DENOM: 'nhash',
        AMOUNT: 100000000000000000000,
        SEND_AMOUNT_1: 5129874,
        SEND_AMOUNT_2: 9834552,
        MULTISEND_AMOUNT_1: 8238481,
        MULTISEND_AMOUNT_2: 3923554,
    },

    HOTDOG_COIN_MARKER: {
        AMOUNT: 1000000000,
        DENOM: 'hotdog.coin',
        TYPE: MarkerType.MARKER_TYPE_COIN,
        ALLOW_GOVERNANCE: true,
        FIXED_SUPPLY: false,
    },
};

describe('BankCore', function () {

    this.timeout(15000);

    const cavendish = new Cavendish();

    const provider = new MockProvider();
    const client = new ProvenanceClient(provider);

    const wallet = Wallet.fromMnemonic(BankCoreTestConfig.BIP39_MNEMONIC, false);
    const sender1 = wallet.getKey(0, 0);
    const sender2 = wallet.getKey(0, 1);
    const receiver1 = wallet.getKey(0, 2);
    const receiver2 = wallet.getKey(0, 3);

    before(async () => {

        // start the localnet blockchain
        await cavendish.start({
            mnemonic: BankCoreTestConfig.BIP39_MNEMONIC,
            accounts: 2,
            hashSupply: BankCoreTestConfig.HASH.AMOUNT.toString(),
            markers: [
                {
                    denom: BankCoreTestConfig.HOTDOG_COIN_MARKER.DENOM,
                    totalSupply: BankCoreTestConfig.HOTDOG_COIN_MARKER.AMOUNT.toString(),
                    manager: sender1.address,
                    access: [
                        MarkerAccess.ADMIN,
                        MarkerAccess.MINT,
                        MarkerAccess.BURN,
                        MarkerAccess.DEPOSIT,
                        MarkerAccess.WITHDRAW,
                    ]
                }
            ]
        });

        // withdraw the entire supply of hotdog coin
        const withdrawTxRes = await client.marker.withdraw(
            BankCoreTestConfig.HOTDOG_COIN_MARKER.DENOM, 
            receiver1.address, 
            [{
                amount: BankCoreTestConfig.HOTDOG_COIN_MARKER.AMOUNT.toString(),
                denom: BankCoreTestConfig.HOTDOG_COIN_MARKER.DENOM
            }], 
            sender1.address
        ).broadcastTx(sender1);

        expect(withdrawTxRes.code).to.equal(0);
        expect(withdrawTxRes.gasUsed).lessThanOrEqual(withdrawTxRes.gasWanted);

    });

    describe('#send', function () {

        it(`Sends coin from one account to another (Coin)`, async () => {
            const txRes = await client.bank.send(
                sender1.address, 
                receiver1.address, 
                {
                    amount: BankCoreTestConfig.HASH.SEND_AMOUNT_1.toString(),
                    denom: BankCoreTestConfig.HASH.DENOM
                }
            ).broadcastTx(sender1);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Sends coin from one account to another (Coin[])`, async () => {
            const txRes = await client.bank.send(sender1.address, receiver1.address, [{
                amount: BankCoreTestConfig.HASH.SEND_AMOUNT_2.toString(),
                denom: BankCoreTestConfig.HASH.DENOM
            }]).broadcastTx(sender1);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Fails to send coin from an account with insufficient funds`, async () => {
            const marker = await client.marker.getTotalSupply(BankCoreTestConfig.HASH.DENOM);

            await client.bank.send(sender1.address, receiver1.address, [{
                amount: (Number.parseInt(marker.amount) + 1).toString(),
                denom: BankCoreTestConfig.HASH.DENOM
            }]).broadcastTx(sender1).then((txRes) => {
                assert.fail(`Unexpected success: Should not be able to send coin from an account with insufficient funds`);
            }).catch((err) => {
                expect(err.message).to.contain('insufficient funds');
            });
        });

    });

    describe('#balance', function () {

        it(`Gets the balance of an account`, async () => {
            const balance = await client.bank.balance(receiver1.address, BankCoreTestConfig.HASH.DENOM);

            expect(balance.denom).to.equal(BankCoreTestConfig.HASH.DENOM);
            expect(balance.amount).to.equal((BankCoreTestConfig.HASH.SEND_AMOUNT_1 + BankCoreTestConfig.HASH.SEND_AMOUNT_2).toString());
        });

    });

    describe('#allBalances', function () {

        it(`Gets the balances of all denoms for an account`, async () => {
            const balances = await client.bank.allBalances(receiver1.address);

            var foundHash = false;
            var foundHotdogCoin = false;
            balances.forEach((balance) => {
                if (balance.denom === BankCoreTestConfig.HASH.DENOM && balance.amount === (BankCoreTestConfig.HASH.SEND_AMOUNT_1 + BankCoreTestConfig.HASH.SEND_AMOUNT_2).toString()) {
                    foundHash = true;
                } else if (balance.denom === BankCoreTestConfig.HOTDOG_COIN_MARKER.DENOM && balance.amount === BankCoreTestConfig.HOTDOG_COIN_MARKER.AMOUNT.toString()) {
                    foundHotdogCoin = true;
                }
            });

            expect(foundHash, `Failed to find balance on account for '${BankCoreTestConfig.HASH.DENOM}'`).to.equal(true);
            expect(foundHotdogCoin, `Failed to find balance on account for '${BankCoreTestConfig.HOTDOG_COIN_MARKER.DENOM}'`).to.equal(true);
        });

    });

    describe('#totalSupply', function () {

        it(`Gets the total supply of all denoms on chain`, async () => {
            const supplyOnChain = await client.bank.totalSupply();

            var foundHash = false;
            var foundHotdogCoin = false;
            supplyOnChain.forEach((supply) => {
                if (supply.denom === BankCoreTestConfig.HASH.DENOM && supply.amount === BankCoreTestConfig.HASH.AMOUNT.toString()) {
                    foundHash = true;
                } else if (supply.denom === BankCoreTestConfig.HOTDOG_COIN_MARKER.DENOM && supply.amount === BankCoreTestConfig.HOTDOG_COIN_MARKER.AMOUNT.toString()) {
                    foundHotdogCoin = true;
                }
            });

            expect(foundHash, `Failed to find total supply for '${BankCoreTestConfig.HASH.DENOM}'`).to.equal(true);
            expect(foundHotdogCoin, `Failed to total supply for '${BankCoreTestConfig.HOTDOG_COIN_MARKER.DENOM}'`).to.equal(true);
        });

    });

    describe('#supplyOf', function () {

        it(`Gets the total supply of the '${BankCoreTestConfig.HASH.DENOM}' denom`, async () => {
            const supply = await client.bank.supplyOf(BankCoreTestConfig.HASH.DENOM);

            expect(supply.denom).to.equal(BankCoreTestConfig.HASH.DENOM);
            expect(supply.amount).to.equal(BankCoreTestConfig.HASH.AMOUNT.toString());
        });

        it(`Gets the total supply of the '${BankCoreTestConfig.HOTDOG_COIN_MARKER.DENOM}' denom`, async () => {
            const supply = await client.bank.supplyOf(BankCoreTestConfig.HOTDOG_COIN_MARKER.DENOM);

            expect(supply.denom).to.equal(BankCoreTestConfig.HOTDOG_COIN_MARKER.DENOM);
            expect(supply.amount).to.equal(BankCoreTestConfig.HOTDOG_COIN_MARKER.AMOUNT.toString());
        });

    });

    /* TODO: Error: 5 NOT_FOUND: client metadata for denom nhash
    describe('#denomMetadata', function () {

        it(`Gets the metadata for denom '${BankCoreTestConfig.HASH.DENOM}'`, async () => {
            const metadata = await client.bank.denomMetadata(BankCoreTestConfig.HASH.DENOM);

            console.dir(metadata);
        });

        it(`Gets the metadata for denom '${BankCoreTestConfig.HOTDOG_COIN_MARKER.DENOM}'`, async () => {
            const metadata = await client.bank.denomMetadata(BankCoreTestConfig.HOTDOG_COIN_MARKER.DENOM);

            console.dir(metadata);
        });

    });
    */

    /* TODO: no metadata, so returns an empty list now
    describe('#denomsMetadata', function () {

        it(`Gets the metadata for all denoms`, async () => {
            const denomsMetadata = await client.bank.denomsMetadata();

            console.dir(denomsMetadata);
        });

    });
    */

    describe('#multiSend', function () {

        it(`Sends coin from multiple accounts to an account`, async () => {
            const txRes = await client.bank.multiSend([
                // from
                {
                    address: sender1.address,
                    coinsList: [
                        {
                            denom: BankCoreTestConfig.HASH.DENOM,
                            amount: BankCoreTestConfig.HASH.MULTISEND_AMOUNT_1.toString()
                        }
                    ]
                },
                {
                    address: receiver1.address,
                    coinsList: [
                        {
                            denom: BankCoreTestConfig.HASH.DENOM,
                            amount: BankCoreTestConfig.HASH.MULTISEND_AMOUNT_2.toString()
                        }
                    ]
                }
            ], [
                // to
                {
                    address: receiver2.address,
                    coinsList: [
                        {
                            denom: BankCoreTestConfig.HASH.DENOM,
                            amount: BankCoreTestConfig.HASH.MULTISEND_AMOUNT_1.toString()
                        }
                    ]
                },
                {
                    address: receiver2.address,
                    coinsList: [
                        {
                            denom: BankCoreTestConfig.HASH.DENOM,
                            amount: BankCoreTestConfig.HASH.MULTISEND_AMOUNT_2.toString()
                        }
                    ]
                }
            ]).broadcastTx([sender1, receiver1]);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            // ensure that the recipient received the coin
            const balances = await client.bank.allBalances(receiver2.address);

            var foundHash = false;
            balances.forEach((balance) => {
                if (balance.denom === BankCoreTestConfig.HASH.DENOM) {
                    expect(balance.amount).to.equal((BankCoreTestConfig.HASH.MULTISEND_AMOUNT_1 + BankCoreTestConfig.HASH.MULTISEND_AMOUNT_2).toString());
                    foundHash = true;
                }
            });

            expect(foundHash, `Failed to find balance on account for '${BankCoreTestConfig.HASH.DENOM}' on '${receiver2.address}'`).to.equal(true);
        });

    });

    // clean-up after the tests run
    after(async () => {

        // stop and reset the localnet blockchain
        await cavendish.stopAndReset();

    });

});
