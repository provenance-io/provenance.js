import * as grpc from 'grpc';

import { 
    Message, 
    ITxClient, 
} from '../../client';
import { IProvider } from '../../providers/IProvider';
import { NameRecord } from '../../types';

import { IQueryClient, QueryClient } from '../../proto/provenance/name/v1/query_grpc_pb';
import * as provenance_name_v1_name_pb from '../../proto/provenance/name/v1/name_pb';
import * as provenance_name_v1_query_pb from '../../proto/provenance/name/v1/query_pb';
import * as provenance_name_v1_tx_pb from '../../proto/provenance/name/v1/tx_pb';

export class NameModule {

    constructor(provider: IProvider, txClient: ITxClient) {
        this.provider = provider;
        this.txClient = txClient;
        this.queryClient = new QueryClient(this.provider.network.uri.toString(), grpc.credentials.createInsecure());
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // Query
    //----------------------------------------------------------------------------------------------------------------------------------------------

    // Reverse lookup of all names bound to a given address
    lookupNamesForAddress(addr: string): Promise<string[]> {
        return new Promise<string[]> ((resolve, reject) => {
            const req = new provenance_name_v1_query_pb.QueryReverseLookupRequest()
                .setAddress(addr);

            // TODO: Move GRPC unary call to the provider
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
            const req = new provenance_name_v1_query_pb.QueryResolveRequest()
                .setName(name);

            // TODO: Move GRPC unary call to the provider
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
    bindName(
        name: string | NameRecord, 
        parent: string | NameRecord, 
        addr?: string
    ): Message {
        var nameRecord: NameRecord;
        var parentRecord: NameRecord;

        if (typeof name === 'string') {
            nameRecord = {
                name: name as string,
                address: addr,
                restricted: false
            };
        } else {
            nameRecord = (name as NameRecord);
        }

        if (typeof parent === 'string') {
            parentRecord = {
                name: parent as string,
                address: addr,
                restricted: false
            };
        } else {
            parentRecord = parent as NameRecord;
        }

        const req = (new provenance_name_v1_tx_pb.MsgBindNameRequest())
            .setRecord((new provenance_name_v1_name_pb.NameRecord())
                .setName(nameRecord.name)
                .setAddress(nameRecord.address)
                .setRestricted(nameRecord.restricted)
            )
            .setParent((new provenance_name_v1_name_pb.NameRecord())
                .setName(parentRecord.name)
                .setAddress(parentRecord.address)
                .setRestricted(parentRecord.restricted)
            );

        return new Message([req], this.txClient);
    }

    // Delete a bound name from the Provenance blockchain
    deleteName(name: string | NameRecord, addr?: string): Message {
        var nameRecord: NameRecord;

        if (typeof name === 'string') {
            nameRecord = {
                name: name as string,
                address: addr,
                restricted: false
            };
        } else {
            nameRecord = (name as NameRecord);
        }

        const req = (new provenance_name_v1_tx_pb.MsgDeleteNameRequest())
            .setRecord((new provenance_name_v1_name_pb.NameRecord())
                .setName(nameRecord.name)
                .setAddress(nameRecord.address)
                .setRestricted(nameRecord.restricted)
            );

        return new Message([req], this.txClient);
    }

    protected readonly provider: IProvider;
    protected readonly txClient: ITxClient;
    protected readonly queryClient: IQueryClient;

};
