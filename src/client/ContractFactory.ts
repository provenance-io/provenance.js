import * as _ from 'lodash';
import Ajv from 'ajv';

import {
    Contract,
    DEFAULT_MESSAGE_DEFINITIONS,
    MessageDefinitions,
    ProvenanceClient,
} from './';
import { 
    CodeAccessConfig,
    Coin,
    TxResponse,
} from '../types';
import { Key } from '../wallet/Key';

export type Contractish = Contract | any;

export class ContractFactory {

    constructor(bytecode: Buffer, schemas: any[] | string[], signer?: Key, msgDefs: MessageDefinitions = DEFAULT_MESSAGE_DEFINITIONS, client?: ProvenanceClient) {
        this.bytecode = bytecode;
        this.schemas = schemas;
        this.signer = signer;

        this.msgDefs = _.merge(msgDefs, DEFAULT_MESSAGE_DEFINITIONS);

        if (client === undefined) {
            this.client = ProvenanceClient.getSingleton();
        }

        var schemaObjs: any[] = [];
        schemas.forEach((schema) => {
            var schemaObj = schema;
            if (typeof schema === 'string') {
                schemaObj = JSON.parse(schema);
            }
            if (!schemaObj.hasOwnProperty('id') && !schemaObj.hasOwnProperty('$id')) {
                schemaObj['$id'] = `https://provenance.io/schema/${schemaObj['title']}`;
            }
            schemaObjs.push(schemaObj);
        });

        this.ajv = new Ajv({ schemas: schemaObjs });
    }

    attach(addr: string): Promise<Contractish> {
        return new Promise<Contractish>(async (resolve, reject) => {
            resolve(new Contract(addr, this.ajv, this.msgDefs, this.client));
        });
    }

    attachByName(name: string): Promise<Contractish> {
        return new Promise<Contractish>(async (resolve, reject) => {
            try {
                const addr = await this.client.name.resolveName(name);
                resolve(new Contract(addr, this.ajv, this.msgDefs, this.client));
            } catch(ex) {
                reject(new Error(`Failed to attach to contract by name: ${ex.message}`));
            }

            reject(new Error('Unimplemented method'));
        });
    }

    connect(signer: Key): ContractFactory {
        return new ContractFactory(this.bytecode, this.schemas, signer, this.msgDefs, this.client);
    }

    deploy(label: string, args?: any, admin?: string, funds?: Coin[], access?: CodeAccessConfig): Promise<Contractish> {
        return new Promise<Contractish>(async (resolve, reject) => {
            // TODO: validate the args

            try {
                const codeId = await this.store(access);
                resolve(this.deployFromCodeId(label, codeId, args, admin, funds));
            } catch (ex) {
                reject(ex);
            }
        });
    }

    deployFromCodeId(label: string, codeId: number, args?: any, admin?: string, funds?: Coin[]): Promise<Contractish> {
        return new Promise<Contractish>(async (resolve, reject) => {
            // TODO: validate the args

            var txRes;
            try {
                txRes = await this.client.wasm.instantiateContract(
                    codeId, 
                    label, 
                    this.signer.address,
                    args, 
                    admin, 
                    funds
                ).broadcastTx(this.signer);
            } catch (ex) {
                reject(new Error(`Failed to deploy contract: ${ex.message}`));
            }
    
            if (txRes.code !== 0) {
                reject(new Error(`Failed to store contract bytecode: code=${txRes.code}`));
            } else {
                const contractAddr = ContractFactory.getLogAttribute(txRes, 0, 'instantiate', '_contract_address');
                resolve(new Contract(contractAddr, this.ajv, this.msgDefs, this.client));
            }
        });
    }

    store(access?: CodeAccessConfig): Promise<number> {
        return new Promise<number>(async (resolve, reject) => {
            var txRes;
            try {
                txRes = await this.client.wasm.storeCode(
                    this.bytecode, 
                    this.signer.address, 
                    access
                ).broadcastTx(this.signer);
            } catch (ex) {
                reject(new Error(`Failed to store contract bytecode: ${ex.message}`));
            }

            if (txRes.code !== 0) {
                reject(new Error(`Failed to store contract bytecode: code=${txRes.code}`));
            } else {
                var codeId = Number(ContractFactory.getLogAttribute(txRes, 0, 'store_code', 'code_id'));
                if (isNaN(codeId)) {
                    reject(new Error(`Contract bytecode was stored but failed to find codeId from tx logs`));
                } else {
                    resolve(codeId);
                }
            }
        });
    }

    // TODO: message log and event filtering utils needs to be added when event stream support goes in
    protected static getLogAttribute(txRes: TxResponse, msgIdx: number, eventType: string, key: string): string {
        var attribute: string;

        try {
            attribute = txRes.logsList
                .find((log) => { return (log.msgIndex === msgIdx); }).eventsList
                .find((event) => { return (event.type === eventType); }).attributesList
                .find((attr) => { return (attr.key === key); })
                .value
        } catch (ex) {}

        return attribute;
    }

    public readonly bytecode: Buffer;
    public readonly msgDefs: MessageDefinitions;
    public readonly signer?: Key;

    protected readonly client: ProvenanceClient;

    protected readonly schemas: any[] | string[];
    protected readonly ajv: Ajv;

}
