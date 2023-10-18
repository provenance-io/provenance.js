import * as grpc from "@grpc/grpc-js";

import { 
    Message,
    ITxClient, 
} from '../../client';
import { IProvider } from '../../providers/IProvider';
import { 
    Code,
    CodeAccessConfig,
    CodeAccessType,
    CodeInfo,
    Coin,
    ContractCodeHistoryEntry,
    ContractInfo,
    ContractModel,
} from '../../types';

import { IQueryClient, QueryClient } from '../../proto/cosmwasm/wasm/v1/query_grpc_pb';
import * as cosmos_base_v1beta1_coin_pb from '../../proto/cosmos/base/v1beta1/coin_pb';
import * as cosmwasm_wasm_v1_query_pb from "../../proto/cosmwasm/wasm/v1/query_pb";
import * as cosmwasm_wasm_v1_types_pb from "../../proto/cosmwasm/wasm/v1/types_pb";
import * as cosmwasm_wasm_v1_tx_pb from "../../proto/cosmwasm/wasm/v1/tx_pb";

export class WasmCore {

    constructor(provider: IProvider, txClient: ITxClient) {
        this.provider = provider;
        this.txClient = txClient;
        this.queryClient = new QueryClient(this.provider.network.uri.toString(), grpc.credentials.createInsecure());
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // Query
    //----------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * Gets contract info.
     * @param addr The address of the contract.
     * @returns The contract info for the specified contract.
     */
    contractInfo(addr: string): Promise<ContractInfo> {
        return new Promise<ContractInfo>((resolve, reject) => {
            const req = (new cosmwasm_wasm_v1_query_pb.QueryContractInfoRequest())
                .setAddress(addr);

            // TODO: Move GRPC unary call to the provider
            this.queryClient.contractInfo(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.getContractInfo().toObject());
                }
            });
        });
    }

    /**
     * Gets the history of a contract.
     * @param addr The address of the contract.
     * @returns The history of the specified contract.
     */
    contractHistory(addr: string): Promise<ContractCodeHistoryEntry[]> {
        return new Promise<ContractCodeHistoryEntry[]>((resolve, reject) => {
            const req = (new cosmwasm_wasm_v1_query_pb.QueryContractHistoryRequest())
                .setAddress(addr);

            // TODO: Move GRPC unary call to the provider
            this.queryClient.contractHistory(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var contractCodeHistoryEntries: ContractCodeHistoryEntry[] = [];
                    res.getEntriesList().forEach((entry) => {
                        contractCodeHistoryEntries.push(entry.toObject());
                    });
                    resolve(contractCodeHistoryEntries);
                }
            });
        });
    }

    /**
     * Gets all contract addresses using a WASM code id.
     * @param codeId The WASM code id.
     * @returns All contract addresses using the specified code id.
     */
    contractsByCode(codeId: number): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            const req = (new cosmwasm_wasm_v1_query_pb.QueryContractsByCodeRequest())
                .setCodeId(codeId);

            // TODO: Move GRPC unary call to the provider
            this.queryClient.contractsByCode(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.getContractsList());
                }
            });
        });
    }

    /**
     * Gets the state of a contract.
     * @param addr The address of the contraact.
     * @returns The state of the specified contract.
     */
    allContractStates(addr: string): Promise<ContractModel[]> {
        return new Promise<ContractModel[]>((resolve, reject) => {
            const req = (new cosmwasm_wasm_v1_query_pb.QueryAllContractStateRequest())
                .setAddress(addr);

            // TODO: Move GRPC unary call to the provider
            this.queryClient.allContractState(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var contractStates: ContractModel[] = [];
                    res.getModelsList().forEach((model) => {
                        contractStates.push(model.toObject());
                    });
                    resolve(contractStates);
                }
            });
        });
    }

    /**
     * 
     * @param addr 
     * @param query 
     * @returns 
     */
    rawContractState(addr: string, query: string | object | Buffer): Promise<string | Uint8Array> {
        return new Promise<string | Uint8Array>((resolve, reject) => {
            var queryData: Buffer;
            if (typeof query === 'object') {
                if (query.constructor.name === 'Buffer') {
                    queryData = query as Buffer;
                } else {
                    queryData = Buffer.from(JSON.stringify(query));
                }
            } else if (typeof query === 'string') {
                queryData = Buffer.from(query);
            }

            const req = (new cosmwasm_wasm_v1_query_pb.QueryRawContractStateRequest())
                .setAddress(addr)
                .setQueryData(queryData);

            // TODO: Move GRPC unary call to the provider
            this.queryClient.rawContractState(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(Buffer.from(res.getData_asB64(), 'base64').toString('utf-8'));
                }
            });
        });
    }

    /**
     * 
     * @param addr 
     * @param query 
     * @returns 
     */
    smartContractState(addr: string, query: string | object): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var queryData: Buffer;
            if (typeof query === 'object') {
                queryData = Buffer.from(JSON.stringify(query));
            } else if (typeof query === 'string') {
                queryData = Buffer.from(query);
            }

            const req = (new cosmwasm_wasm_v1_query_pb.QuerySmartContractStateRequest())
                .setAddress(addr)
                .setQueryData(queryData);

            // TODO: Move GRPC unary call to the provider
            this.queryClient.smartContractState(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(JSON.parse(Buffer.from(res.getData_asB64(), 'base64').toString('utf-8')));
                }
            });
        });
    }

    /**
     * 
     * @param codeId 
     * @returns 
     */
    code(codeId: number): Promise<Code> {
        return new Promise<Code>((resolve, reject) => {
            const req = (new cosmwasm_wasm_v1_query_pb.QueryCodeRequest())
                .setCodeId(codeId);

            // TODO: Move GRPC unary call to the provider
            this.queryClient.code(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve({
                        info: res.getCodeInfo().toObject(),
                        bytecode: res.getData()
                    });
                }
            });
        });
    }

    /**
     * 
     * @returns 
     */
    codes(): Promise<CodeInfo[]> {
        return new Promise<CodeInfo[]>((resolve, reject) => {
            const req = (new cosmwasm_wasm_v1_query_pb.QueryCodesRequest());

            // TODO: Move GRPC unary call to the provider
            this.queryClient.codes(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var codeInfoList: CodeInfo[] = [];
                    res.getCodeInfosList().forEach((codeInfo) => {
                        codeInfoList.push(codeInfo.toObject());
                    });
                    resolve(codeInfoList);
                }
            });
        });
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // TX
    //----------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * 
     * @param bytecode 
     * @param sender 
     * @param access 
     * @returns 
     */
    storeCode(bytecode: Buffer, sender: string, access?: CodeAccessConfig): Message {
        const req = (new cosmwasm_wasm_v1_tx_pb.MsgStoreCode())
            .setWasmByteCode(bytecode)
            .setSender(sender);

        if (access !== undefined) {
            req.setInstantiatePermission((new cosmwasm_wasm_v1_types_pb.AccessConfig())
                .setAddress(access.address)
                .setPermission(access.permission)
            )
        }

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param codeId 
     * @param label 
     * @param sender 
     * @param args 
     * @param admin 
     * @param funds 
     * @returns 
     */
    instantiateContract(codeId: number, label: string, sender: string, args?: string | object, admin?: string, funds?: Coin[]): Message {
        if (admin === undefined) {
            admin = sender;
        }

        var msg: Buffer;
        if (args !== undefined) {
            if (typeof args === 'object') {
                msg = Buffer.from(JSON.stringify(args));
            } else if (typeof args === 'string') {
                msg = Buffer.from(args);
            } else {
                msg = args;
            }
        }

        var fundsList: cosmos_base_v1beta1_coin_pb.Coin[] = [];
        if (funds !== undefined) {
            funds.forEach((fund) => {
                fundsList.push((new cosmos_base_v1beta1_coin_pb.Coin)
                    .setAmount(fund.amount)
                    .setDenom(fund.denom)
                );
            });
        }

        const req = (new cosmwasm_wasm_v1_tx_pb.MsgInstantiateContract())
            .setCodeId(codeId)
            .setLabel(label)
            .setSender(sender)
            .setAdmin(admin)
            .setFundsList(fundsList)
            .setMsg(msg);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param addr 
     * @param sender 
     * @param args 
     * @param admin 
     * @param funds 
     * @returns 
     */
    executeContract(addr: string, sender: string, args?: string | object, admin?: string, funds?: Coin[]): Message {
        var msg: Buffer;
        if (args !== undefined) {
            if (typeof args === 'object') {
                msg = Buffer.from(JSON.stringify(args));
            } else if (typeof args === 'string') {
                msg = Buffer.from(args);
            } else {
                msg = args;
            }
        }

        var fundsList: cosmos_base_v1beta1_coin_pb.Coin[] = [];
        if (funds !== undefined) {
            funds.forEach((fund) => {
                fundsList.push((new cosmos_base_v1beta1_coin_pb.Coin)
                    .setAmount(fund.amount)
                    .setDenom(fund.denom)
                );
            });
        }

        const req = (new cosmwasm_wasm_v1_tx_pb.MsgExecuteContract())
            .setContract(addr)
            .setMsg(msg)
            .setFundsList(fundsList)
            .setSender(sender);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param addr 
     * @param codeId 
     * @param sender 
     * @param args 
     * @returns 
     */
    migrateContract(addr: string, codeId: number, sender: string, args?: string | object): Message {
        var msg: Buffer;
        if (args !== undefined) {
            if (typeof args === 'object') {
                msg = Buffer.from(JSON.stringify(args));
            } else if (typeof args === 'string') {
                msg = Buffer.from(args);
            } else {
                msg = args;
            }
        }

        const req = (new cosmwasm_wasm_v1_tx_pb.MsgMigrateContract())
            .setContract(addr)
            .setCodeId(codeId)
            .setMsg(msg)
            .setSender(sender);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param addr 
     * @param newAdmin 
     * @param sender 
     * @returns 
     */
    updateAdmin(addr: string, newAdmin: string, sender: string): Message {
        const req = (new cosmwasm_wasm_v1_tx_pb.MsgUpdateAdmin())
            .setContract(addr)
            .setNewAdmin(newAdmin)
            .setSender(sender);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param addr 
     * @param sender 
     * @returns 
     */
    clearAdmin(addr: string, sender: string): Message {
        const req = (new cosmwasm_wasm_v1_tx_pb.MsgClearAdmin())
            .setContract(addr)
            .setSender(sender);

        return new Message([req], this.txClient);
    }

    protected readonly provider: IProvider;
    protected readonly txClient: ITxClient;
    protected queryClient: IQueryClient;

}
