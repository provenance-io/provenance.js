import * as jspb from 'google-protobuf';
import * as grpc from 'grpc';

import { IProvider } from '../../providers/IProvider';
import { Attribute, AttributeType } from '../../types';
import { IQueryClient, QueryClient } from '../../proto/provenance/attribute/v1/query_grpc_pb';

import * as provenance_attribute_v1_query_pb from '../../proto/provenance/attribute/v1/query_pb';
import * as provenance_attribute_v1_tx_pb from '../../proto/provenance/attribute/v1/tx_pb';

type AttributeValue = string | Buffer;

export class AttributeModule {

    constructor(provider: IProvider) {
        this.provider = provider;
        this.queryClient = new QueryClient(this.provider.network.uri.toString(), grpc.credentials.createInsecure());
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // Query
    //----------------------------------------------------------------------------------------------------------------------------------------------

    // Get account attributes by name
    getAccountAttributesByName(addr: string, name: string): Promise<Attribute[]> {
        return new Promise<Attribute[]> ((resolve, reject) => {
            const req = (new provenance_attribute_v1_query_pb.QueryAttributeRequest())
                .setAccount(addr)
                .setName(name);

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
            const req = (new provenance_attribute_v1_query_pb.QueryAttributesRequest())
                .setAccount(addr);

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
            const req = (new provenance_attribute_v1_query_pb.QueryScanRequest())
                .setAccount(addr)
                .setSuffix(suffix);

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

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // TX
    //----------------------------------------------------------------------------------------------------------------------------------------------

    // Add an account attribute to the Provenance blockchain
    addAttribute(
        addr: string, 
        type: AttributeType, 
        name: string, 
        value: AttributeValue, 
        owner?: string
    ): jspb.Message {
        const req = (new provenance_attribute_v1_tx_pb.MsgAddAttributeRequest())
            .setAccount(addr)
            .setAttributeType(type)
            .setName(name)
            .setValue(value);

        if (typeof owner !== 'undefined') {
            // TODO: is optional?
            req.setOwner(owner);
        }

        return req;
    }

    // Delete an account attribute from the Provenance blockchain
    deleteAttribute(
        addr: string, 
        name: string, 
        owner?: string
    ): jspb.Message {
        const req = (new provenance_attribute_v1_tx_pb.MsgDeleteAttributeRequest())
            .setAccount(addr)
            .setName(name);

        if (typeof owner !== 'undefined') {
            // TODO: is optional?
            req.setOwner(owner);
        }

        return req;
    }

    // Delete an account attribute with specific name and value the Provenance blockchain
    deleteDistinctAttribute(
        addr: string, 
        name: string, 
        value: AttributeValue, 
        owner?: string
    ): jspb.Message {
        const req = (new provenance_attribute_v1_tx_pb.MsgDeleteDistinctAttributeRequest())
            .setAccount(addr)
            .setName(name)
            .setValue(value);
        
        if (typeof owner !== 'undefined') {
            // TODO: is optional?
            req.setOwner(owner);
        }

        return req;
    }

    // Update an account attribute on the Provenance blockchain
    updateAttribute(
        addr: string, 
        name: string, 
        oldType: AttributeType, 
        newType: AttributeType, 
        oldValue: AttributeValue, 
        newValue: AttributeValue, 
        owner?: string
    ): jspb.Message {
        const req = (new provenance_attribute_v1_tx_pb.MsgUpdateAttributeRequest())
            .setAccount(addr)
            .setName(name)
            .setOriginalAttributeType(oldType)
            .setUpdateAttributeType(newType)
            .setOriginalValue(oldValue)
            .setUpdateValue(newValue);

        if (typeof owner !== 'undefined') {
            // TODO: is optional?
            req.setOwner(owner);
        }

        return req;
    }

    private readonly provider: IProvider;
    private queryClient: IQueryClient;

};
