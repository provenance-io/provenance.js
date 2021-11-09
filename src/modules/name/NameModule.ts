import * as grpc from 'grpc';

import { IProvider } from '../../providers/IProvider';
import { IQueryClient, QueryClient } from '../../proto/provenance/name/v1/query_grpc_pb';
import * as name_query_pb from '../../proto/provenance/name/v1/query_pb';

export class NameModule {

    constructor(provider: IProvider) {
        this.provider = provider;
        this.queryClient = new QueryClient(this.provider.network.uri.toString(), grpc.credentials.createInsecure());
    }

    // Reverse lookup of all names bound to a given address
    lookupNamesForAddress(addr: string): Promise<string[]> {
        return new Promise<string[]> ((resolve, reject) => {
            const req = new name_query_pb.QueryReverseLookupRequest();
            req.setAddress(addr);
            this.queryClient.reverseLookup(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.getNameList());
                }
            });
        });
    }

    // Resolve the address for a name
    resolveName(name: string): Promise<string> {
        return new Promise<string> ((resolve, reject) => {
            const req = new name_query_pb.QueryResolveRequest();
            req.setName(name);
            this.queryClient.resolve(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.getAddress());
                }
            });
        });
    }

    private readonly provider: IProvider;
    private queryClient: IQueryClient;

};
