import * as grpc from "@grpc/grpc-js";

import { 
    Message, 
    ITxClient, 
} from '../../client';
import { IProvider } from '../../providers/IProvider';
import { Attribute, AttributeType } from '../../types';

import { IQueryClient, QueryClient } from '../../proto/provenance/attribute/v1/query_grpc_pb';
import * as provenance_attribute_v1_query_pb from '../../proto/provenance/attribute/v1/query_pb';
import * as provenance_attribute_v1_tx_pb from '../../proto/provenance/attribute/v1/tx_pb';

type AttributeValue = string | Buffer | object;

export interface IAccountAttribute extends Attribute {

    get stringValue(): string;
    get jsonValue(): object;

}

export class AccountAttribute implements IAccountAttribute {

    constructor(attr: Attribute) {
        this.name = attr.name;
        this.value = attr.value;
        this.attributeType = attr.attributeType;
        this.address = attr.address;
    }

    get jsonValue(): object {
        if(this.attributeType == AttributeType.ATTRIBUTE_TYPE_JSON) {
            return JSON.parse(Buffer.from(this.value as string, 'base64').toString('binary'));
        } else {
            throw new Error('Attribute is not a JSON object');
        }
    }

    get stringValue(): string {
        if(this.attributeType == AttributeType.ATTRIBUTE_TYPE_STRING) {
            return Buffer.from(this.value as string, 'base64').toString('binary');
        } else {
            throw new Error('Attribute is not a string');
        }
    }

    name: string;
    value: Uint8Array | string;
    attributeType: AttributeType;
    address: string;

}

export class AttributeModule {

    constructor(provider: IProvider, txClient: ITxClient) {
        this.provider = provider;
        this.txClient = txClient;
        this.queryClient = new QueryClient(this.provider.network.uri.toString(), grpc.credentials.createInsecure());
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // Query
    //----------------------------------------------------------------------------------------------------------------------------------------------

    // Get account attributes by name
    getAccountAttributesByName(addr: string, name: string): Promise<AccountAttribute[]> {
        return new Promise<AccountAttribute[]> ((resolve, reject) => {
            const req = (new provenance_attribute_v1_query_pb.QueryAttributeRequest())
                .setAccount(addr)
                .setName(name);

            this.queryClient.attribute(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var attributes: AccountAttribute[] = [];
                    res.getAttributesList().forEach((attr) => {
                        attributes.push(new AccountAttribute(attr.toObject()));
                    });
                    resolve(attributes);
                }
            });
        });
    }

    // Get all account attributes
    getAllAccountAttributes(addr: string): Promise<AccountAttribute[]> {
        return new Promise<AccountAttribute[]> ((resolve, reject) => {
            const req = (new provenance_attribute_v1_query_pb.QueryAttributesRequest())
                .setAccount(addr);

            this.queryClient.attributes(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var attributes: AccountAttribute[] = [];
                    res.getAttributesList().forEach((attr) => {
                        attributes.push(new AccountAttribute(attr.toObject()));
                    });
                    resolve(attributes);
                }
            });
        });
    }

    // Scan account attributes by name suffix
    scanAccountAttributesByNameSuffix(addr: string, suffix: string): Promise<AccountAttribute[]> {
        return new Promise<AccountAttribute[]> ((resolve, reject) => {
            const req = (new provenance_attribute_v1_query_pb.QueryScanRequest())
                .setAccount(addr)
                .setSuffix(suffix);

            this.queryClient.scan(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var attributes: AccountAttribute[] = [];
                    res.getAttributesList().forEach((attr) => {
                        attributes.push(new AccountAttribute(attr.toObject()));
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
        owner: string
    ): Message {
        var val: string | Buffer;
        if (typeof value === 'object') {
            val = Buffer.from(JSON.stringify(value));
        } else {
            val = Buffer.from(value);
        }

        const req = (new provenance_attribute_v1_tx_pb.MsgAddAttributeRequest())
            .setAccount(addr)
            .setAttributeType(type)
            .setName(name)
            .setValue(val)
            .setOwner(owner);

        return new Message([req], this.txClient);
    }

    // Delete an account attribute from the Provenance blockchain
    deleteAttribute(
        addr: string, 
        name: string, 
        owner: string
    ): Message {
        const req = (new provenance_attribute_v1_tx_pb.MsgDeleteAttributeRequest())
            .setAccount(addr)
            .setName(name)
            .setOwner(owner);

        return new Message([req], this.txClient);
    }

    // Delete an account attribute with specific name and value on the Provenance blockchain
    deleteDistinctAttribute(
        addr: string, 
        name: string, 
        value: AttributeValue, 
        owner: string
    ): Message {
        var val: string | Buffer;
        if (typeof value === 'object') {
            val = Buffer.from(JSON.stringify(value));
        } else {
            val = Buffer.from(value);
        }

        const req = (new provenance_attribute_v1_tx_pb.MsgDeleteDistinctAttributeRequest())
            .setAccount(addr)
            .setName(name)
            .setValue(val)
            .setOwner(owner);

        return new Message([req], this.txClient);
    }

    // Update an account attribute on the Provenance blockchain
    updateAttribute(
        addr: string, 
        name: string, 
        oldType: AttributeType, 
        newType: AttributeType, 
        oldValue: AttributeValue, 
        newValue: AttributeValue, 
        owner: string
    ): Message {
        var oldVal: string | Buffer;
        if (typeof oldValue === 'object') {
            oldVal = Buffer.from(JSON.stringify(oldValue));
        } else {
            oldVal = Buffer.from(oldValue);
        }

        var newVal: string | Buffer;
        if (typeof newValue === 'object') {
            newVal = Buffer.from(JSON.stringify(newValue));
        } else {
            newVal = Buffer.from(newValue);
        }

        const req = (new provenance_attribute_v1_tx_pb.MsgUpdateAttributeRequest())
            .setAccount(addr)
            .setName(name)
            .setOriginalAttributeType(oldType)
            .setUpdateAttributeType(newType)
            .setOriginalValue(oldVal)
            .setUpdateValue(newVal)
            .setOwner(owner);

        return new Message([req], this.txClient);
    }

    protected readonly provider: IProvider;
    protected readonly txClient: ITxClient;
    protected readonly queryClient: IQueryClient;

};
