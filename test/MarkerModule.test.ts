import { assert, expect, use } from 'chai';
import * as chainAsPromise from 'chai-as-promised';
import { Cavendish } from '@provenanceio/cavendish';
import { MockProvider } from './mock/MockProvider';

import { 
    Access, 
    MarkerStatus, 
    MarkerType, 
    ProvenanceClient, 
    Wallet, 
} from '../src';

const MarkerModuleTestConfig = {
    BIP39_MNEMONIC: 'name broom medal pen slogan blush version banana message grant all decline weekend rhythm near art imitate milk winter clap awesome green soccer beauty',

    INVALID_MARKER_DENOM: 'invalid.marker',

    HOTDOG_COIN_MARKER: {
        AMOUNT: 1000000000,
        DENOM: 'hotdog.coin',
        TYPE: MarkerType.MARKER_TYPE_COIN,
        ALLOW_GOVERNANCE: true,
        FIXED_SUPPLY: false,
        MINT_AMOUNT: 9999,
        WITHDRAW_AMOUNT: 12345,
    },

    ASSET_RESTRICTED_MARKER: {
        AMOUNT: 1000,
        DENOM: 'asset.restricted',
        TYPE: MarkerType.MARKER_TYPE_RESTRICTED,
        ALLOW_GOVERNANCE: true,
        FIXED_SUPPLY: true,
        MINT_AMOUNT: 999,
        WITHDRAW_AMOUNT: 123,
    }
};

use(chainAsPromise);

describe('MarkerModule', function () {

    this.timeout(30000);

    const cavendish = new Cavendish();

    const provider = new MockProvider();
    const client = new ProvenanceClient(provider);

    const wallet = Wallet.fromMnemonic(MarkerModuleTestConfig.BIP39_MNEMONIC, false);
    const creator = wallet.getKey(0, 0);
    const coinAdmin = wallet.getKey(0, 1);
    const assetAdmin = wallet.getKey(0, 2);
    const recipient = wallet.getKey(0, 3);

    before(async () => {

        // start the localnet blockchain
        await cavendish.start({
            mnemonic: MarkerModuleTestConfig.BIP39_MNEMONIC,
            accounts: 4
        });

    });

    describe('#addMarker', function () {

        it(`Proposes a new coin marker`, async () => {
            const txRes = await client.marker.addMarker(
                {
                    amount: MarkerModuleTestConfig.HOTDOG_COIN_MARKER.AMOUNT.toString(),
                    denom: MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM
                }, 
                creator.address, 
                MarkerModuleTestConfig.HOTDOG_COIN_MARKER.TYPE, 
                MarkerStatus.MARKER_STATUS_PROPOSED,
                [
                    {
                        address: coinAdmin.address,
                        permissionsList: [
                            Access.ACCESS_MINT,
                            Access.ACCESS_BURN,
                            Access.ACCESS_DEPOSIT,
                            Access.ACCESS_WITHDRAW,
                            Access.ACCESS_DELETE,
                            Access.ACCESS_ADMIN,
                        ]
                    }
                ],
                MarkerModuleTestConfig.HOTDOG_COIN_MARKER.ALLOW_GOVERNANCE,
                MarkerModuleTestConfig.HOTDOG_COIN_MARKER.FIXED_SUPPLY,
                creator.address
            ).broadcastTx(creator);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Proposes a new restricted marker`, async () => {
            const txRes = await client.marker.addMarker(
                {
                    amount: MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.AMOUNT.toString(),
                    denom: MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM
                }, 
                creator.address, 
                MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.TYPE, 
                MarkerStatus.MARKER_STATUS_PROPOSED,
                [
                    {
                        address: assetAdmin.address,
                        permissionsList: [
                            Access.ACCESS_MINT,
                            Access.ACCESS_BURN,
                            Access.ACCESS_DEPOSIT,
                            Access.ACCESS_WITHDRAW,
                            Access.ACCESS_DELETE,
                            Access.ACCESS_ADMIN,
                            Access.ACCESS_TRANSFER,
                        ]
                    }
                ],
                MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.ALLOW_GOVERNANCE,
                MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.FIXED_SUPPLY,
                creator.address
            ).broadcastTx(creator);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

    });

    describe('#finalize', function () {

        it(`Finalizes a proposed coin marker`, async () => {
            const txRes = await client.marker.finalize(
                MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM, 
                creator.address
            ).broadcastTx(creator);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Finalizes a proposed restricted marker`, async () => {
            const txRes = await client.marker.finalize(
                MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM, 
                creator.address
            ).broadcastTx(creator);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

    });

    describe('#activate', function () {

        it(`Activates a finalized coin marker`, async () => {
            const txRes = await client.marker.activate(
                MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM, 
                creator.address
            ).broadcastTx(creator);
            
            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

        it(`Activates a finalized restricted marker`, async () => {
            const txRes = await client.marker.activate(
                MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM, 
                creator.address
            ).broadcastTx(creator);
            
            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });

    });

    describe('#getMarker', function () {

        it(`Locates a coin marker by denom`, async () => {
            const marker = await client.marker.getMarker(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM);

            expect(marker.allowGovernanceControl).to.equal(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.ALLOW_GOVERNANCE);
            expect(marker.denom).to.equal(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM);
            expect(marker.markerType).to.equal(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.TYPE);
            expect(marker.status).to.equal(MarkerStatus.MARKER_STATUS_ACTIVE);
            expect(marker.supply).to.equal(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.AMOUNT.toString());
            expect(marker.supplyFixed).to.equal(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.FIXED_SUPPLY);
        });

        it(`Locates a restricted marker by denom`, async () => {
            const marker = await client.marker.getMarker(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM);

            expect(marker.allowGovernanceControl).to.equal(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.ALLOW_GOVERNANCE);
            expect(marker.denom).to.equal(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM);
            expect(marker.markerType).to.equal(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.TYPE);
            expect(marker.status).to.equal(MarkerStatus.MARKER_STATUS_ACTIVE);
            expect(marker.supply).to.equal(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.AMOUNT.toString());
            expect(marker.supplyFixed).to.equal(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.FIXED_SUPPLY);
        });

        it(`Fails to locate an invalid marker`, async () => {
            try {
                const marker = await client.marker.getMarker(MarkerModuleTestConfig.INVALID_MARKER_DENOM);
                assert.fail(`Unexpected success: Should not be able to locate an invalid marker`);
            } catch(err) {
                expect(err.message).to.contain('marker not found');
            }
        });

    });

    describe('#getAllMarkers', function () {

        it(`Locates all markers`, async () => {
            const markers = await client.marker.getAllMarkers();

            markers.forEach((marker) => {
                if (marker.denom === MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM) {
                    expect(marker.allowGovernanceControl).to.equal(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.ALLOW_GOVERNANCE);
                    expect(marker.denom).to.equal(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM);
                    expect(marker.markerType).to.equal(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.TYPE);
                    expect(marker.status).to.equal(MarkerStatus.MARKER_STATUS_ACTIVE);
                    expect(marker.supply).to.equal(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.AMOUNT.toString());
                    expect(marker.supplyFixed).to.equal(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.FIXED_SUPPLY);
                } else if (marker.denom === MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM) {
                    expect(marker.allowGovernanceControl).to.equal(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.ALLOW_GOVERNANCE);
                    expect(marker.denom).to.equal(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM);
                    expect(marker.markerType).to.equal(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.TYPE);
                    expect(marker.status).to.equal(MarkerStatus.MARKER_STATUS_ACTIVE);
                    expect(marker.supply).to.equal(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.AMOUNT.toString());
                    expect(marker.supplyFixed).to.equal(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.FIXED_SUPPLY);
                }
            });
        });

    });

    describe('#getTotalSupply', function () {

        it(`Gets the total supply of a coin marker by denom`, async () => {
            const supply = await client.marker.getTotalSupply(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM);

            expect(supply.denom).to.equal(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM);
            expect(Number.parseInt(supply.amount)).to.equal(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.AMOUNT);
        });

        it(`Gets the total supply of a restricted marker by denom`, async () => {
            const supply = await client.marker.getTotalSupply(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM);

            expect(supply.denom).to.equal(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM);
            expect(Number.parseInt(supply.amount)).to.equal(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.AMOUNT);
        });

        it(`Fails to get the total supply of an invalid marker`, async () => {
            try {
                const supply = await client.marker.getTotalSupply(MarkerModuleTestConfig.INVALID_MARKER_DENOM);
                assert.fail(`Unexpected success: Should not be able to get the total supply of an invalid marker`);
            } catch(err) {
                expect(err.message).to.contain('marker not found');
            }
        });

    });

    describe('#mint', function () {

        it(`Mints tokens for a coin marker`, async () => {
            const txRes = await client.marker.mint({
                amount: MarkerModuleTestConfig.HOTDOG_COIN_MARKER.MINT_AMOUNT.toString(),
                denom: MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM
            }, coinAdmin.address).broadcastTx(coinAdmin);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            // TODO: get bank balance for marker account and verify new amount
        });

        it(`Mints tokens for a restricted marker`, async () => {
            const txRes = await client.marker.mint({
                amount: MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.MINT_AMOUNT.toString(),
                denom: MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM
            }, assetAdmin.address).broadcastTx(assetAdmin);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            // TODO: get bank balance for marker account and verify new amount
        });

    });

    describe('#burn', function () {

        it(`Burns tokens for a coin marker`, async () => {
            const txRes = await client.marker.burn({
                amount: MarkerModuleTestConfig.HOTDOG_COIN_MARKER.MINT_AMOUNT.toString(),
                denom: MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM
            }, coinAdmin.address).broadcastTx(coinAdmin);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            // TODO: get bank balance for marker account and verify new amount
        });

        it(`Burns tokens for a restricted marker`, async () => {
            const txRes = await client.marker.burn({
                amount: MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.MINT_AMOUNT.toString(),
                denom: MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM
            }, assetAdmin.address).broadcastTx(assetAdmin);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            // TODO: get bank balance for marker account and verify new amount
        });

    });

    describe('#withdraw', function () {

        it(`Fails to withdraw tokens from a coin marker with insufficient funds`, async () => {
            expect(client.marker.withdraw(
                MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM, 
                recipient.address, 
                [{
                    amount: (MarkerModuleTestConfig.HOTDOG_COIN_MARKER.AMOUNT + 1).toString(),
                    denom: MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM
                }],
                coinAdmin.address
            ).broadcastTx(coinAdmin)).to.eventually.be.rejected;
        });

        it(`Fails to withdraw tokens from a restricted marker with insufficient funds`, async () => {
            expect(client.marker.withdraw(
                MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM, 
                recipient.address, 
                [{
                    amount: (MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.WITHDRAW_AMOUNT + 1).toString(),
                    denom: MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM
                }],
                assetAdmin.address
            ).broadcastTx(assetAdmin)).to.eventually.be.rejected;
        });

        it(`Withdraws tokens from a coin marker`, async () => {
            const txRes = await client.marker.withdraw(
                MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM, 
                recipient.address, 
                [{
                    amount: MarkerModuleTestConfig.HOTDOG_COIN_MARKER.WITHDRAW_AMOUNT.toString(),
                    denom: MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM
                }],
                coinAdmin.address
            ).broadcastTx(coinAdmin);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            const balance = await client.bank.balance(
                recipient.address, 
                MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM
            );

            expect(balance.denom).to.equal(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM);
            expect(balance.amount).to.equal(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.WITHDRAW_AMOUNT.toString());
        });

        it(`Withdraws tokens from a restricted marker`, async () => {
            const txRes = await client.marker.withdraw(
                MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM, 
                recipient.address, 
                [{
                    amount: MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.WITHDRAW_AMOUNT.toString(),
                    denom: MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM
                }],
                assetAdmin.address
            ).broadcastTx(assetAdmin);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            // TODO: get bank balance for recipient account and verify new amount
        });

    });

    describe('#getAllAccountsHoldingMarker', function () {

        it (`Gets all account holders for a coin marker`, async () => {
            const marker = await client.marker.getMarker(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM);
            const holders = await client.marker.getAllAccountsHoldingMarker(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM);

            var foundMarker = false;
            var foundRecipient = false;
            holders.forEach((holder) => {
                if (holder.address === marker.baseAccount.address) {
                    foundMarker = true;
                } else if (holder.address === recipient.address) {
                    foundRecipient = true;
                }
            })

            expect(foundMarker, 'Failed to find marker account holding marker').to.equal(true);
            expect(foundRecipient, 'Failed to find recipient account holding marker').to.equal(true);
        });

        it (`Gets all account holders for a restricted marker`, async () => {
            const marker = await client.marker.getMarker(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM);
            const holders = await client.marker.getAllAccountsHoldingMarker(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM);

            var foundMarker = false;
            var foundRecipient = false;
            holders.forEach((holder) => {
                if (holder.address === marker.baseAccount.address) {
                    foundMarker = true;
                } else if (holder.address === recipient.address) {
                    foundRecipient = true;
                }
            })

            expect(foundMarker, 'Failed to find marker account holding marker').to.equal(true);
            expect(foundRecipient, 'Failed to find recipient account holding marker').to.equal(true);
        });

    });

    describe('#transfer', function () {

        it(`Fails to broker transfer for a coin marker holder`, async () => {
            const marker = await client.marker.getMarker(MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM);

            expect(client.marker.transfer(
                {
                    amount: MarkerModuleTestConfig.HOTDOG_COIN_MARKER.WITHDRAW_AMOUNT.toString(),
                    denom: MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM
                },
                recipient.address, 
                marker.baseAccount.address,
                coinAdmin.address
            ).broadcastTx(coinAdmin)).to.eventually.be.rejected;
        });

        /* TODO: Error: 2 UNKNOWN: failed to execute message; message index: 0: tp1sp4f0ymwc84j0f4d4cu72gvhjuw7wsszcutux7 account has not been granted authority to withdraw from tp1szmgnu930sf5yjhwqs7uqqhrg5lgjn3nv4np4d account
        it(`Transfers tokens from a restricted marker holder`, async () => {
            const marker = await client.marker.getMarker(MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM);

            const txRes = await client.marker.transfer(
                {
                    amount: MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.WITHDRAW_AMOUNT.toString(),
                    denom: MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM
                },
                recipient.address, 
                marker.baseAccount.address,
                assetAdmin.address
            ).broadcastTx(assetAdmin);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);

            // TODO: get bank balance for sender account and verify new amount
        });
        */

    });

    describe('#addAccess', function () {

        // TODO

    });

    describe('#getAccessGrantsForMarker', function () {

        // TODO

    });

    describe('#deleteAccess', function () {

        // TODO

    });

    describe('#setMetadata', function () {

        // TODO

    });

    describe('#getMetadata', function () {

        // TODO

    });

    describe('#cancel', function () {

        /* TODO: the outstanding coin needs to be sent back to the marker using the bank send
        it(`Cancels an active coin marker`, async () => {
            const txRes = await client.marker.cancel(
                MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM, 
                coinAdmin.address
            ).broadcastTx(coinAdmin);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });
        */

        /* TODO: the outstanding coin needs to be transferred back to the marker using the marker transfer
        it(`Cancels an active restricted marker`, async () => {
            const txRes = await client.marker.cancel(
                MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM, 
                assetAdmin.address
            ).broadcastTx(assetAdmin);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });
        */

    });

    describe('#delete', function () {

        /* TODO: the outstanding coin needs to be sent back to the marker using the bank send
        it(`Deletes a cancelled coin marker`, async () => {
            const txRes = await client.marker.delete(
                MarkerModuleTestConfig.HOTDOG_COIN_MARKER.DENOM, 
                coinAdmin.address
            ).broadcastTx(coinAdmin);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });
        */

        /* TODO: the outstanding coin needs to be transferred back to the marker using the marker transfer
        it(`Deletes a cancelled restricted marker`, async () => {
            const txRes = await client.marker.delete(
                MarkerModuleTestConfig.ASSET_RESTRICTED_MARKER.DENOM, 
                assetAdmin.address
            ).broadcastTx(assetAdmin);

            expect(txRes.code).to.equal(0);
            expect(txRes.gasUsed).lessThanOrEqual(txRes.gasWanted);
        });
        */

    });

    // clean-up after the tests run
    after(async () => {

        // stop and reset the localnet blockchain
        await cavendish.stopAndReset();

    });

});
