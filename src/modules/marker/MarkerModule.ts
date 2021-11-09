import * as grpc from 'grpc';

import { IProvider } from '../../providers/IProvider';
import { AccessGrant, Balance, Coin, MarkerAccount, Metadata } from '../../types';
import { IQueryClient, QueryClient } from '../../proto/provenance/marker/v1/query_grpc_pb';
import * as marker_pb from '../../proto/provenance/marker/v1/marker_pb';
import * as marker_query_pb from '../../proto/provenance/marker/v1/query_pb';

export class MarkerModule {

    constructor(provider: IProvider) {
        this.provider = provider;
        this.queryClient = new QueryClient(this.provider.network.uri.toString(), grpc.credentials.createInsecure());
    }

    // Get all marker registrations on the Provenance Blockchain
    getAllMarkers(status: marker_pb.MarkerStatus = marker_pb.MarkerStatus.MARKER_STATUS_UNSPECIFIED): Promise<MarkerAccount[]> {
        return new Promise<MarkerAccount[]> ((resolve, reject) => {
            const req = new marker_query_pb.QueryAllMarkersRequest();
            req.setStatus(marker_pb.MarkerStatus.MARKER_STATUS_UNSPECIFIED);
            this.queryClient.allMarkers(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var markers: MarkerAccount[] = [];
                    res.getMarkersList().forEach((marker) => {
                        const markerAccount = marker_pb.MarkerAccount.deserializeBinary(marker.getValue_asU8())
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
            const req = new marker_query_pb.QueryMarkerRequest();
            req.setId(denom);
            this.queryClient.marker(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    const markerAccount = marker_pb.MarkerAccount.deserializeBinary(res.getMarker().getValue_asU8())
                    resolve(markerAccount.toObject());
                }
            });
        });
    }

    // Get all accounts holding the given marker on the Provenance Blockchain
    getAllAccountsHoldingMarker(denom: string): Promise<Balance[]> {
        return new Promise<Balance[]> ((resolve, reject) => {
            const req = new marker_query_pb.QueryHoldingRequest();
            req.setId(denom);
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
            const req = new marker_query_pb.QuerySupplyRequest();
            req.setId(denom);
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
            const req = new marker_query_pb.QueryEscrowRequest();
            req.setId(denom);
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
            const req = new marker_query_pb.QueryAccessRequest();
            req.setId(denom);
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
            const req = new marker_query_pb.QueryDenomMetadataRequest();
            req.setDenom(denom);

            this.queryClient.denomMetadata(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.getMetadata().toObject());
                }
            });
        });
    }

    private readonly provider: IProvider;
    private queryClient: IQueryClient;

};
