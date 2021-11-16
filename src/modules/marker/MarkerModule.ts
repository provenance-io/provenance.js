import * as jspb from 'google-protobuf';
import * as grpc from 'grpc';

import { 
    Message, 
    ITxClient, 
} from '../../client';
import { IProvider } from '../../providers/IProvider';
import { AccessGrant, Balance, Coin, MarkerAccount, MarkerStatus, MarkerType, Metadata } from '../../types';

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
    getMetadata(denom: string): Promise<Metadata> {
        return new Promise<Metadata> ((resolve, reject) => {
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
    finalize(denom: string, admin?: string): jspb.Message {
        const req = (new provenance_marker_v1_tx_pb.MsgFinalizeRequest())
            .setDenom(denom);

        if (typeof admin !== 'undefined') {
            // TODO: is optional?
            req.setAdministrator(admin);
        }
        
        return req;
    }

    // Activate the marker account
    activate(denom: string, admin?: string): jspb.Message {
        const req = (new provenance_marker_v1_tx_pb.MsgActivateRequest())
            .setDenom(denom);

        if (typeof admin !== 'undefined') {
            // TODO: is optional?
            req.setAdministrator(admin);
        }
        
        return req;
    }

    // Cancel the marker account
    cancel(denom: string, admin?: string): jspb.Message {
        const req = (new provenance_marker_v1_tx_pb.MsgCancelRequest())
            .setDenom(denom);
        
        if (typeof admin !== 'undefined') {
            // TODO: is optional?
            req.setAdministrator(admin);
        }
        
        return req;
    }

    // Mark the marker for deletion
    delete(denom: string, admin?: string): jspb.Message {
        const req = (new provenance_marker_v1_tx_pb.MsgDeleteRequest())
            .setDenom(denom);
        
        if (typeof admin !== 'undefined') {
            // TODO: is optional?
            req.setAdministrator(admin);
        }
        
        return req;
    }

    // Mint coins against the marker
    mint(coin: Coin, admin?: string): jspb.Message {
        const req = (new provenance_marker_v1_tx_pb.MsgMintRequest())
            .setAmount((new cosmos_base_v1beta1_coin_pb.Coin())
                .setAmount(coin.amount)
                .setDenom(coin.denom)
            );
        
        if (typeof admin !== 'undefined') {
            // TODO: is optional?
            req.setAdministrator(admin);
        }

        return req;
    }

    // Burn coins from the marker
    burn(coin: Coin, admin?: string): jspb.Message {
        const req = (new provenance_marker_v1_tx_pb.MsgBurnRequest())
            .setAmount((new cosmos_base_v1beta1_coin_pb.Coin())
                .setAmount(coin.amount)
                .setDenom(coin.denom)
            );

        if (typeof admin !== 'undefined') {
            // TODO: is optional?
            req.setAdministrator(admin);
        }
        
        return req;
    }

    // Grant access to a marker for the address coins from the marker
    addAccess(
        denom: string, 
        accessList: AccessGrant[], 
        admin?: string
    ): jspb.Message {
        var grants: provenance_marker_v1_accessgrant_pb.AccessGrant[] = [];
        accessList.forEach((accessGrant) => {
            grants.push((new provenance_marker_v1_accessgrant_pb.AccessGrant())
                .setAddress(accessGrant.address)
                .setPermissionsList(accessGrant.permissionsList)
            );
        });

        const req = (new provenance_marker_v1_tx_pb.MsgAddAccessRequest())
            .setDenom(denom)
            .setAccessList(grants);
        
        if (typeof admin !== 'undefined') {
            // TODO: is optional?
            req.setAdministrator(admin);
        }

        return req;
    }

    // Revoke all access to a marker for the address
    deleteAccess(
        denom: string, 
        addr: string, 
        admin?: string
    ): jspb.Message {
        const req = (new provenance_marker_v1_tx_pb.MsgDeleteAccessRequest())
            .setDenom(denom)
            .setRemovedAddress(addr);

        if (typeof admin !== 'undefined') {
            // TODO: is optional?
            req.setAdministrator(admin);
        }
        
        return req;
    }

    // Withdraw coins from the marker
    withdraw(
        denom: string, 
        to: string, 
        amountList: Coin[], 
        admin?: string
    ): jspb.Message {
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
            .setAmountList(amounts);

        if (typeof admin !== 'undefined') {
            // TODO: is optional?
            req.setAdministrator(admin);
        }
        
        return req;
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
    ): jspb.Message {
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
        
        return req;
    }

    // Transfer coins from one account to another
    transfer(): jspb.Message {
        const req = (new provenance_marker_v1_tx_pb.MsgTransferRequest())
            // TODO
            ;
        
        return req;
    }

    // Set metadata for a marker
    setMetadata(metadata: Metadata, admin?: string): jspb.Message {
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
            );
        
        if (typeof admin !== 'undefined') {
            // TODO: is optional?
            req.setAdministrator(admin);
        }

        return req;
    }

    protected readonly provider: IProvider;
    protected readonly txClient: ITxClient;
    protected readonly queryClient: IQueryClient;

};
