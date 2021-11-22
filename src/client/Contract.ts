import Ajv from 'ajv';
import { SchemaEnv } from 'ajv/lib/compile';
import * as Case from 'case';

import { 
    Coin,
    Key,
    Message,
    ProvenanceClient,
} from '../';

export interface MessageDefinitions {
    instantiate: string,
    execute: string,
    migrate: string,
    query: string,
}

export const DEFAULT_MESSAGE_DEFINITIONS: MessageDefinitions = {
    instantiate: 'InstantiateMsg',
    execute: 'ExecuteMsg',
    migrate: 'MigrateMsg',
    query: 'QueryMsg',
};

function instanceOfCoin(object: any): object is Coin {
    return ('denom' in object && 'amount' in object);
}

function instanceOfCoinArray(object: any): object is Coin[] {
    var isCoinArray = false;

    if(object.constructor.name === 'Array') {
        isCoinArray = true;
        object.forEach((coin) => {
            isCoinArray = isCoinArray && instanceOfCoin(coin);
        });
    }

    return isCoinArray;
}

export class Contract {

    constructor(addr: string, ajv: Ajv, msgDefs: MessageDefinitions = DEFAULT_MESSAGE_DEFINITIONS, client?: ProvenanceClient, signer?: Key, admin?: Key) {
        this.address = addr;
        this.ajv = ajv;
        this.msgDefs = msgDefs;
        this.signer = signer;
        this.admin = admin;

        if (client === undefined) {
            this.client = ProvenanceClient.getSingleton();
        } else {
            this.client = client;
        }

        for (var key in ajv.schemas) {
            const schema = ajv.schemas[key];
            switch (schema.schema['title']) {
                case msgDefs.execute: { this.generateExecuteFunctions(schema); } break;
                case msgDefs.migrate: { this.generateMigrateFunctions(schema); } break;
                case msgDefs.query: { this.generateQueryFunctions(schema); } break;
            }
        }
    }

    connect(signer: Key, admin?: Key): Contract {
        return new Contract(
            this.address, 
            this.ajv, 
            this.msgDefs, 
            this.client, 
            signer, 
            admin
        );
    }

    private generateExecuteFunctions(schema: SchemaEnv) {
        const executeFuncSchemas = schema.schema['anyOf'];
        executeFuncSchemas.forEach((executeFuncSchema) => {
            if (executeFuncSchema['type'] === 'object' && executeFuncSchema['required'].length === 1) {
                const func = executeFuncSchema['required'][0];
                const funcName = Case.camel(func);

                this[funcName] = function (...args): Message {
                    var msg = {};
                    msg[func] = {};

                    var funds: Coin[] = undefined;

                    if (args.length < 2) {
                        if (args.length === 1) {
                            if (typeof args[0] === 'object') {
                                msg[func] = args[0];
                            } else {
                                throw new Error(`Invalid argument(0): Must be an object`);
                            }
                        }
                    } else {
                        if (typeof args[0] === 'object') {
                            msg[func] = args[0];
                            if (typeof args[1] === 'object') {
                                if (instanceOfCoin(args[1])) {
                                    funds = [args[1]];
                                } else if (instanceOfCoinArray(args[1])) {
                                    funds = args[1];
                                } else {
                                    throw new Error(`Invalid argument(1): Executing with funds requires a Coin or Coin[]`);
                                }
                            } else {
                                throw new Error(`Invalid argument(1): Executing with funds requires a Coin or Coin[]`);
                            }
                        } else {
                            throw new Error(`Invalid argument(0): Must be an object`);
                        }
                    }

                    // validate the message
                    const validator = this.ajv.compile(executeFuncSchema);
                    if (!validator(msg)) {
                        throw new Error(`Invalid argument(s): Schema validation failed`);
                    }

                    // construct the contract execute message
                    return this.client.wasm.executeContract(
                        this.address, 
                        this.signer !== undefined ? this.signer.address : undefined, 
                        msg, 
                        this.admin !== undefined ? this.admin.address : undefined,
                        funds
                    );
                }
            }
        });
    }

    private generateMigrateFunctions(schema: SchemaEnv) {
        const migrateFuncSchemas = schema.schema['anyOf'];
        migrateFuncSchemas.forEach((migrateFuncSchema) => {
            if (migrateFuncSchema['type'] === 'object' && migrateFuncSchema['required'].length === 1) {
                const func = migrateFuncSchema['required'][0];
                const funcName = Case.camel(func);

                this[funcName] = function (...args): Message {
                    var codeId;

                    var msg = {};
                    msg[func] = {};

                    if (args.length > 0) {
                        if (typeof args[0] === 'number') {
                            codeId = args[0];
                            if (args.length > 1) {
                                msg[func] = args[0];
                            }
                        } else {
                            throw new Error(`Invalid argument(0): Must be a number`);
                        }
                    } else {
                        throw new Error(`Missing argument(s): Must include the codeId to migrate to`);
                    }

                    // validate the message
                    const validator = this.ajv.compile(migrateFuncSchema);
                    if (!validator(msg)) {
                        throw new Error(`Invalid argument(s): Schema validation failed`);
                    }

                    // construct the contract migrate message
                    return this.client.wasm.migrateContract(
                        this.address, 
                        codeId, 
                        this.signer !== undefined ? this.signer.address : undefined, 
                        msg
                    );
                }
            }
        });
    }

    private generateQueryFunctions(schema: SchemaEnv) {
        const queryFuncSchemas = schema.schema['anyOf'];
        queryFuncSchemas.forEach((queryFuncSchema) => {
            if (queryFuncSchema['type'] === 'object' && queryFuncSchema['required'].length === 1) {
                const func = queryFuncSchema['required'][0];
                const funcName = Case.camel(func);

                this[funcName] = function (...args): Promise<any> {
                    return new Promise<any>((resolve, reject) => {
                        var query = {};
                        query[func] = {};

                        if (args.length > 0) {
                            if (typeof args[0] === 'object') {
                                query[func] = args[0];
                            } else {
                                throw new Error(`Invalid argument(0): Must be an object`);
                            }
                        }

                        // validate the message
                        const validator = this.ajv.compile(queryFuncSchema);
                        if (!validator(query)) {
                            throw new Error(`Invalid argument(s): Schema validation failed`);
                        }

                        // query the contract state
                        this.client.wasm.smartContractState(this.address, query).then((state) => {
                            resolve(state);
                        }).catch((err) => {
                            reject(err);
                        });
                    });
                }
            }
        });
    }

    public readonly address: string;
    public readonly signer: Key;
    public readonly admin: Key;

    protected readonly client: ProvenanceClient;

    protected readonly ajv: Ajv;
    protected readonly msgDefs: MessageDefinitions;

}
