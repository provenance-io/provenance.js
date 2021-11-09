import * as grpc from 'grpc';

import { IProvider } from '../../providers/IProvider';
import { Attribute } from '../../types';
import { IQueryClient, QueryClient } from '../../proto/provenance/attribute/v1/query_grpc_pb';
import * as attribute_query_pb from '../../proto/provenance/attribute/v1/query_pb';

export class AttributeModule {

    constructor(provider: IProvider) {
        this.provider = provider;
        this.queryClient = new QueryClient(this.provider.network.uri.toString(), grpc.credentials.createInsecure());
    }

    // Get account attributes by name
    getAccountAttributesByName(addr: string, name: string): Promise<Attribute[]> {
        return new Promise<Attribute[]> ((resolve, reject) => {
            const req = new attribute_query_pb.QueryAttributeRequest();
            req.setAccount(addr);
            req.setName(name);
            this.queryClient.attribute(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var attributes: Attribute[] = [];
                    res.getAttributesList().forEach((attr) => {
                        attributes.push(attr.toObject());
                    });
                    resolve(attributes);
                }
            });
        });
    }

    // Get all account attributes
    getAllAccountAttributes(addr: string): Promise<Attribute[]> {
        return new Promise<Attribute[]> ((resolve, reject) => {
            const req = new attribute_query_pb.QueryAttributesRequest();
            req.setAccount(addr);
            this.queryClient.attributes(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var attributes: Attribute[] = [];
                    res.getAttributesList().forEach((attr) => {
                        attributes.push(attr.toObject());
                    });
                    resolve(attributes);
                }
            });
        });
    }

    // Scan account attributes by name suffix
    scanAccountAttributesByNameSuffix(addr: string, suffix: string): Promise<Attribute[]> {
        return new Promise<Attribute[]> ((resolve, reject) => {
            const req = new attribute_query_pb.QueryScanRequest();
            req.setAccount(addr);
            req.setSuffix(suffix);
            this.queryClient.scan(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var attributes: Attribute[] = [];
                    res.getAttributesList().forEach((attr) => {
                        attributes.push(attr.toObject());
                    });
                    resolve(attributes);
                }
            });
        });
    }

    private readonly provider: IProvider;
    private queryClient: IQueryClient;

};
