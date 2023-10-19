import * as grpc from "@grpc/grpc-js";

import { 
    Message, 
    ITxClient, 
} from '../../client';
import { IProvider } from '../../providers/IProvider';
import { AccessGrant, Balance, Coin, MarkerAccount, MarkerStatus, MarkerType, DenomMetadata } from '../../types';

import { IQueryClient, QueryClient } from '../../proto/provenance/marker/v1/query_grpc_pb';
import * as cosmos_bank_v1beta1_bank_pb from "../../proto/cosmos/bank/v1beta1/bank_pb";
import * as cosmos_base_v1beta1_coin_pb from '../../proto/cosmos/base/v1beta1/coin_pb';
import * as provenance_marker_v1_accessgrant_pb from '../../proto/provenance/marker/v1/accessgrant_pb';
import * as provenance_marker_v1_pb from '../../proto/provenance/marker/v1/marker_pb';
import * as provenance_marker_v1_query_pb from '../../proto/provenance/marker/v1/query_pb';
import * as provenance_marker_v1_tx_pb from "../../proto/provenance/marker/v1/tx_pb";

export class MarkerModule {

    constructor(provider: IProvider, txClient: ITxClient) {
        this.provider = provider;
        this.txClient = txClient;
        this.queryClient = new QueryClient(this.provider.network.uri.toString(), grpc.credentials.createInsecure());
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // Query
    //----------------------------------------------------------------------------------------------------------------------------------------------

    // Get all marker registrations on the Provenance Blockchain
    getAllMarkers(status: provenance_marker_v1_pb.MarkerStatus = provenance_marker_v1_pb.MarkerStatus.MARKER_STATUS_UNSPECIFIED): Promise<MarkerAccount[]> {
        return new Promise<MarkerAccount[]> ((resolve, reject) => {
            const req = (new provenance_marker_v1_query_pb.QueryAllMarkersRequest())
                .setStatus(provenance_marker_v1_pb.MarkerStatus.MARKER_STATUS_UNSPECIFIED);
                
            this.queryClient.allMarkers(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var markers: MarkerAccount[] = [];
                    res.getMarkersList().forEach((marker) => {
                        const markerAccount = provenance_marker_v1_pb.MarkerAccount.deserializeBinary(marker.getValue_asU8())
                        markers.push(markerAccount.toObject());
                    });
                    resolve(markers);
                }
            });
        });
    }

    // Get marker details
    getMarker(denom: string): Promise<MarkerAccount> {
        return new Promise<MarkerAccount> ((resolve, reject) => {
            const req = (new provenance_marker_v1_query_pb.QueryMarkerRequest())
                .setId(denom);

            this.queryClient.marker(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    const markerAccount = provenance_marker_v1_pb.MarkerAccount.deserializeBinary(res.getMarker().getValue_asU8())
                    resolve(markerAccount.toObject());
                }
            });
        });
    }

    // Get all accounts holding the given marker on the Provenance Blockchain
    getAllAccountsHoldingMarker(denom: string): Promise<Balance[]> {
        return new Promise<Balance[]> ((resolve, reject) => {
            const req = (new provenance_marker_v1_query_pb.QueryHoldingRequest())
                .setId(denom);

            this.queryClient.holding(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var balances: Balance[] = [];
                    res.getBalancesList().forEach((balance) => {
                        balances.push(balance.toObject());
                    });
                    resolve(balances);
                }
            });
        });
    }

    // Get total supply for marker
    getTotalSupply(denom: string): Promise<Coin> {
        return new Promise<Coin> ((resolve, reject) => {
            const req = (new provenance_marker_v1_query_pb.QuerySupplyRequest())
                .setId(denom);

            this.queryClient.supply(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.getAmount().toObject());
                }
            });
        });
    }

    // Get coins in escrow by marker
    getCoinsInEscrow(denom: string): Promise<Coin[]> {
        return new Promise<Coin[]> ((resolve, reject) => {
            const req = (new provenance_marker_v1_query_pb.QueryEscrowRequest())
                .setId(denom);

            this.queryClient.escrow(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var coins: Coin[] = [];
                    res.getEscrowList().forEach((coin) => {
                        coins.push(coin.toObject());
                    });
                    resolve(coins);
                }
            });
        });
    }

    // Get access grants defined for marker
    getAccessGrantsForMarker(denom: string): Promise<AccessGrant[]> {
        return new Promise<AccessGrant[]> ((resolve, reject) => {
            const req = (new provenance_marker_v1_query_pb.QueryAccessRequest())
                .setId(denom);
                
            this.queryClient.access(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var grants: AccessGrant[] = [];
                    res.getAccountsList().forEach((grant) => {
                        grants.push(grant.toObject());
                    });
                    resolve(grants);
                }
            });
        });
    }

    // Get metadata for marker
    getMetadata(denom: string): Promise<DenomMetadata> {
        return new Promise<DenomMetadata> ((resolve, reject) => {
            const req = (new provenance_marker_v1_query_pb.QueryDenomMetadataRequest())
                .setDenom(denom);

            this.queryClient.denomMetadata(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.getMetadata().toObject());
                }
            });
        });
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // TX
    //----------------------------------------------------------------------------------------------------------------------------------------------

    // Finalize the marker account
    finalize(denom: string, admin: string): Message {
        const req = (new provenance_marker_v1_tx_pb.MsgFinalizeRequest())
            .setDenom(denom)
            .setAdministrator(admin);
        
        return new Message([req], this.txClient);
    }

    // Activate the marker account
    activate(denom: string, admin: string): Message {
        const req = (new provenance_marker_v1_tx_pb.MsgActivateRequest())
            .setDenom(denom)
            .setAdministrator(admin);
        
        return new Message([req], this.txClient);
    }

    // Cancel the marker account
    cancel(denom: string, admin: string): Message {
        const req = (new provenance_marker_v1_tx_pb.MsgCancelRequest())
            .setDenom(denom)
            .setAdministrator(admin);
        
        return new Message([req], this.txClient);
    }

    // Mark the marker for deletion
    delete(denom: string, admin: string): Message {
        const req = (new provenance_marker_v1_tx_pb.MsgDeleteRequest())
            .setDenom(denom)
            .setAdministrator(admin);
        
        return new Message([req], this.txClient);
    }

    // Mint coins against the marker
    mint(coin: Coin, admin: string): Message {
        const req = (new provenance_marker_v1_tx_pb.MsgMintRequest())
            .setAmount((new cosmos_base_v1beta1_coin_pb.Coin())
                .setAmount(coin.amount)
                .setDenom(coin.denom)
            )
            .setAdministrator(admin);

        return new Message([req], this.txClient);
    }

    // Burn coins from the marker
    burn(coin: Coin, admin: string): Message {
        const req = (new provenance_marker_v1_tx_pb.MsgBurnRequest())
            .setAmount((new cosmos_base_v1beta1_coin_pb.Coin())
                .setAmount(coin.amount)
                .setDenom(coin.denom)
            )
            .setAdministrator(admin);
        
        return new Message([req], this.txClient);
    }

    // Grant access to a marker for the address
    addAccess(
        denom: string, 
        accessList: AccessGrant[], 
        admin: string
    ): Message {
        var grants: provenance_marker_v1_accessgrant_pb.AccessGrant[] = [];
        accessList.forEach((accessGrant) => {
            grants.push((new provenance_marker_v1_accessgrant_pb.AccessGrant())
                .setAddress(accessGrant.address)
                .setPermissionsList(accessGrant.permissionsList)
            );
        });

        const req = (new provenance_marker_v1_tx_pb.MsgAddAccessRequest())
            .setDenom(denom)
            .setAccessList(grants)
            .setAdministrator(admin);

        return new Message([req], this.txClient);
    }

    // Revoke all access to a marker for the address
    deleteAccess(
        denom: string, 
        addr: string, 
        admin: string
    ): Message {
        const req = (new provenance_marker_v1_tx_pb.MsgDeleteAccessRequest())
            .setDenom(denom)
            .setRemovedAddress(addr)
            .setAdministrator(admin);
        
        return new Message([req], this.txClient);
    }

    // Withdraw coins from the marker
    withdraw(
        denom: string, 
        to: string, 
        amountList: Coin[], 
        admin: string
    ): Message {
        var amounts: cosmos_base_v1beta1_coin_pb.Coin[] = [];
        amountList.forEach((amount) => {
            amounts.push((new cosmos_base_v1beta1_coin_pb.Coin)
                .setAmount(amount.amount)
                .setDenom(amount.denom)
            );
        });

        const req = (new provenance_marker_v1_tx_pb.MsgWithdrawRequest())
            .setDenom(denom)
            .setToAddress(to)
            .setAmountList(amounts)
            .setAdministrator(admin);
        
        return new Message([req], this.txClient);
    }

    // Create a new marker
    addMarker(
        coin: Coin,
        from: string, 
        type: MarkerType, 
        status: MarkerStatus,
        accessList: AccessGrant[], 
        allowGovernance: boolean, 
        fixedSupply: boolean,
        manager: string
    ): Message {
        var grants: provenance_marker_v1_accessgrant_pb.AccessGrant[] = [];
        accessList.forEach((accessGrant) => {
            grants.push((new provenance_marker_v1_accessgrant_pb.AccessGrant())
                .setAddress(accessGrant.address)
                .setPermissionsList(accessGrant.permissionsList)
            );
        });
        
        const req = (new provenance_marker_v1_tx_pb.MsgAddMarkerRequest())
            .setAmount((new cosmos_base_v1beta1_coin_pb.Coin())
                .setAmount(coin.amount)
                .setDenom(coin.denom)
            )
            .setFromAddress(from)
            .setMarkerType(type)
            .setStatus(status)
            .setAccessListList(grants)
            .setAllowGovernanceControl(allowGovernance)
            .setSupplyFixed(fixedSupply)
            .setManager(manager);
        
        return new Message([req], this.txClient);
    }

    // Transfer coins from one account to another
    transfer(
        coin: Coin,
        from: string,
        to: string,
        admin: string
    ): Message {
        const req = (new provenance_marker_v1_tx_pb.MsgTransferRequest())
            .setAmount((new cosmos_base_v1beta1_coin_pb.Coin())
                .setAmount(coin.amount)
                .setDenom(coin.denom)
            )
            .setFromAddress(from)
            .setToAddress(to)
            .setAdministrator(admin);
        
        return new Message([req], this.txClient);
    }

    // Set metadata for a marker
    setMetadata(metadata: DenomMetadata, admin: string): Message {
        var denomUnits: cosmos_bank_v1beta1_bank_pb.DenomUnit[] = [];
        metadata.denomUnitsList.forEach((denomUnit) => {
            denomUnits.push((new cosmos_bank_v1beta1_bank_pb.DenomUnit())
                .setAliasesList(denomUnit.aliasesList)
                .setDenom(denomUnit.denom)
                .setExponent(denomUnit.exponent)
            );
        });

        const req = (new provenance_marker_v1_tx_pb.MsgSetDenomMetadataRequest())
            .setMetadata((new cosmos_bank_v1beta1_bank_pb.Metadata())
                .setBase(metadata.base)
                .setDenomUnitsList(denomUnits)
                .setDescription(metadata.description)
                .setDisplay(metadata.display)
                .setName(metadata.name)
                .setSymbol(metadata.symbol)
            )
            .setAdministrator(admin);

        return new Message([req], this.txClient);
    }

    protected readonly provider: IProvider;
    protected readonly txClient: ITxClient;
    protected readonly queryClient: IQueryClient;

};
