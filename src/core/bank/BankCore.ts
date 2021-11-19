import * as grpc from 'grpc';

import { ITxClient } from '../../client';
import { IProvider } from '../../providers/IProvider';
import { 
    Coin,
    DenomMetadata,
} from '../../types';

import { IQueryClient, QueryClient } from '../../proto/cosmos/bank/v1beta1/query_grpc_pb';
import * as cosmos_bank_v1beta1_query_pb from '../../proto/cosmos/bank/v1beta1/query_pb';
import * as cosmos_bank_v1beta1_tx_pb from "../../proto/cosmos/bank/v1beta1/tx_pb";

export class BankCore {

    constructor(provider: IProvider, txClient: ITxClient) {
        this.provider = provider;
        this.txClient = txClient;
        this.queryClient = new QueryClient(this.provider.network.uri.toString(), grpc.credentials.createInsecure());
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // Query
    //----------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * Get the balance of a denom in an account.
     * @param addr The account address to query.
     * @param denom The denom to query on the account.
     * @returns The account balance of the specified address for the specified denom.
     */
    balance(addr: string, denom: string): Promise<Coin> {
        return new Promise<Coin>((resolve, reject) => {
            const req = (new cosmos_bank_v1beta1_query_pb.QueryBalanceRequest())
                .setAddress(addr)
                .setDenom(denom);

            // TODO: Move GRPC unary call to the provider
            this.queryClient.balance(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.getBalance().toObject());
                }
            });
        });
    }

    /**
     * Get balances for all denoms held by an account.
     * @param addr The account address to query.
     * @returns All account balances for the specified address.
     */
    allBalances(addr: string): Promise<Coin[]> {
        return new Promise<Coin[]>((resolve, reject) => {
            const req = (new cosmos_bank_v1beta1_query_pb.QueryAllBalancesRequest())
                .setAddress(addr);
                
            // TODO: Move GRPC unary call to the provider
            this.queryClient.allBalances(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var balanceList: Coin[] = [];
                    res.getBalancesList().forEach((balance) => {
                        balanceList.push(balance.toObject());
                    });
                    resolve(balanceList);
                }
            });
        });
    }

    /**
     * Get the total supply of coins on the chain.
     * @returns The total supply of coins on the chain.
     */
    totalSupply(): Promise<Coin[]> {
        return new Promise<Coin[]>((resolve, reject) => {
            const req = (new cosmos_bank_v1beta1_query_pb.QueryTotalSupplyRequest());

            // TODO: Move GRPC unary call to the provider
            this.queryClient.totalSupply(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var supplyList: Coin[] = [];
                    res.getSupplyList().forEach((supply) => {
                        supplyList.push(supply.toObject());
                    });
                    resolve(supplyList);
                }
            });
        });
    }

    /**
     * Get the total supply for a denom.
     * @param denom The denom to query.
     * @returns The total supply of the specified denom.
     */
    supplyOf(denom: string): Promise<Coin> {
        return new Promise<Coin>((resolve, reject) => {
            const req = (new cosmos_bank_v1beta1_query_pb.QuerySupplyOfRequest())
                .setDenom(denom);

            // TODO: Move GRPC unary call to the provider
            this.queryClient.supplyOf(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.getAmount().toObject());
                }
            });
        });
    }

    /**
     * Get the metadata for a denom.
     * @param denom The denom to query.
     * @returns The denom metadata.
     */
    denomMetadata(denom: string): Promise<DenomMetadata> {
        return new Promise<DenomMetadata>((resolve, reject) => {
            const req = (new cosmos_bank_v1beta1_query_pb.QueryDenomMetadataRequest())
                .setDenom(denom);

            // TODO: Move GRPC unary call to the provider
            this.queryClient.denomMetadata(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.getMetadata().toObject());
                }
            });
        });
    }

    /**
     * Get the metadata for all denoms.
     * @returns The metadata for all denoms.
     */
    denomsMetadata(): Promise<DenomMetadata[]> {
        return new Promise<DenomMetadata[]>((resolve, reject) => {
            const req = (new cosmos_bank_v1beta1_query_pb.QueryDenomsMetadataRequest());

            // TODO: Move GRPC unary call to the provider
            this.queryClient.denomsMetadata(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var metadataList: DenomMetadata[] = [];
                    res.getMetadatasList().forEach((metadata) => {
                        metadataList.push(metadata.toObject());
                    });
                    resolve(metadataList);
                }
            });
        });
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // TX
    //----------------------------------------------------------------------------------------------------------------------------------------------

    protected readonly provider: IProvider;
    protected readonly txClient: ITxClient;
    protected queryClient: IQueryClient;

}
