import * as grpc from 'grpc';

import { BaseAccount, MarkerAccount } from '../../types';
import { anyToMessage, getMessageTypeUrl } from '../../utils/MessageUtils';
import { IProvider } from '../../providers/IProvider';
import { IQueryClient, QueryClient } from '../../proto/cosmos/auth/v1beta1/query_grpc_pb';

import * as cosmos_auth_v1beta1_auth_pb from '../../proto/cosmos/auth/v1beta1/auth_pb';
import * as cosmos_auth_v1beta1_query_pb from '../../proto/cosmos/auth/v1beta1/query_pb';
import * as provenance_marker_v1_marker_pb from '../../proto/provenance/marker/v1/marker_pb';

export class AuthCore {

    constructor(provider: IProvider) {
        this.provider = provider;
        this.queryClient = new QueryClient(this.provider.network.uri.toString(), grpc.credentials.createInsecure());
    }

    public static getBaseAccount(provider: IProvider, addr: string): Promise<BaseAccount> {
        return (new AuthCore(provider).getBaseAccount(addr));
    }

    getBaseAccount(addr: string): Promise<BaseAccount> {
        return new Promise<BaseAccount> ((resolve, reject) => {
            const req = (new cosmos_auth_v1beta1_query_pb.QueryAccountRequest())
                .setAddress(addr);

            // TODO: Move GRPC unary call to the provider
            this.queryClient.account(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    const account = res.getAccount();
                    if (account.getTypeUrl() === getMessageTypeUrl(new cosmos_auth_v1beta1_auth_pb.BaseAccount())) {
                        const baseAccount = anyToMessage(account);
                        resolve(baseAccount.toObject());
                    } else {
                        reject(new Error(`Account type not handled: ${account.getTypeUrl()}`));
                    }
                }
            });
        });
    }

    getMarkerAccount(addr: string): Promise<MarkerAccount> {
        return new Promise<MarkerAccount> ((resolve, reject) => {
            const req = (new cosmos_auth_v1beta1_query_pb.QueryAccountRequest())
                .setAddress(addr);

            // TODO: Move GRPC unary call to the provider
            this.queryClient.account(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    const account = res.getAccount();
                    if (account.getTypeUrl() === getMessageTypeUrl(new provenance_marker_v1_marker_pb.MarkerAccount())) {
                        const baseAccount = anyToMessage(account);
                        resolve(baseAccount.toObject());
                    } else {
                        reject(new Error(`Account type not handled: ${account.getTypeUrl()}`));
                    }
                }
            });
        });
    }

    private readonly provider: IProvider;
    private queryClient: IQueryClient;

}
