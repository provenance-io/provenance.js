import * as cosmwasm_wasm_v1_query_pb from '../proto/cosmwasm/wasm/v1/query_pb';
import * as cosmwasm_wasm_v1_types_pb from '../proto/cosmwasm/wasm/v1/types_pb';

export { AccessType as CodeAccessType } from '../proto/cosmwasm/wasm/v1/types_pb';
export type CodeAccessConfig = cosmwasm_wasm_v1_types_pb.AccessConfig.AsObject;
export type CodeInfo = cosmwasm_wasm_v1_query_pb.CodeInfoResponse.AsObject;
export type ContractCodeHistoryEntry = cosmwasm_wasm_v1_types_pb.ContractCodeHistoryEntry.AsObject;
export type ContractInfo = cosmwasm_wasm_v1_types_pb.ContractInfo.AsObject;
export type ContractModel = cosmwasm_wasm_v1_types_pb.Model.AsObject;

export interface Code {
    info: CodeInfo,
    bytecode: string | Uint8Array
}
