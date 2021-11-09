import * as jspb from 'google-protobuf';
import * as grpc from 'grpc';

import { IProvider } from '../../providers/IProvider';
import { NameRecord } from '../../types';
import { IQueryClient, QueryClient } from '../../proto/provenance/name/v1/query_grpc_pb';
import * as provenance_name_v1_name_pb from '../../proto/provenance/name/v1/name_pb';
import * as provenance_name_v1_query_pb from '../../proto/provenance/name/v1/query_pb';
import * as provenance_name_v1_tx_pb from '../../proto/provenance/name/v1/tx_pb';

export class NameModule {

    constructor(provider: IProvider) {
        this.provider = provider;
        this.queryClient = new QueryClient(this.provider.network.uri.toString(), grpc.credentials.createInsecure());
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // Query
    //----------------------------------------------------------------------------------------------------------------------------------------------

    // Reverse lookup of all names bound to a given address
    lookupNamesForAddress(addr: string): Promise<string[]> {
        return new Promise<string[]> ((resolve, reject) => {
            const req = new provenance_name_v1_query_pb.QueryReverseLookupRequest();
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
            const req = new provenance_name_v1_query_pb.QueryResolveRequest();
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

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // TX
    //----------------------------------------------------------------------------------------------------------------------------------------------

    // Bind a name to an address under the given root (parent) name in the Provenance blockchain
    bindName(name: NameRecord, parent: NameRecord): jspb.Message {
        const req = (new provenance_name_v1_tx_pb.MsgBindNameRequest())
            .setRecord((new provenance_name_v1_name_pb.NameRecord())
                .setName(name.name)
                .setAddress(name.address)
                .setRestricted(name.restricted)
            )
            .setParent((new provenance_name_v1_name_pb.NameRecord())
                .setName(parent.name)
                .setAddress(parent.address)
                .setRestricted(parent.restricted)
            );

        return req;
    }

    // Delete a bound name from the Provenance blockchain
    deleteName(name: NameRecord): jspb.Message {
        const req = (new provenance_name_v1_tx_pb.MsgDeleteNameRequest())
            .setRecord((new provenance_name_v1_name_pb.NameRecord())
                .setName(name.name)
                .setAddress(name.address)
                .setRestricted(name.restricted)
            );

        return req;
    }

    private readonly provider: IProvider;
    private queryClient: IQueryClient;

};
