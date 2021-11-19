import * as cosmos_auth_v1beta1_auth_pb from '../proto/cosmos/auth/v1beta1/auth_pb';
import * as cosmos_base_v1beta1_coin_pb from '../proto/cosmos/base/v1beta1/coin_pb';
import * as cosmos_base_abci_v1beta1_abci_pb from '../proto/cosmos/base/abci/v1beta1/abci_pb';
import * as cosmos_bank_v1beta1_bank_pb from "../proto/cosmos/bank/v1beta1/bank_pb";
import * as cosmos_tx_v1beta1_tx_pb from '../proto/cosmos/tx/v1beta1/tx_pb';

export type BaseAccount = cosmos_auth_v1beta1_auth_pb.BaseAccount.AsObject;
export type AuthInfo = cosmos_tx_v1beta1_tx_pb.AuthInfo.AsObject;
export type Coin = cosmos_base_v1beta1_coin_pb.Coin.AsObject;
export type DenomMetadata = cosmos_bank_v1beta1_bank_pb.Metadata.AsObject;
export type ModuleAccount = cosmos_auth_v1beta1_auth_pb.ModuleAccount.AsObject;
export type MultiSendInput = cosmos_bank_v1beta1_bank_pb.Input.AsObject;
export type MultiSendOutput = cosmos_bank_v1beta1_bank_pb.Output.AsObject;
export { SignMode } from '../proto/cosmos/tx/signing/v1beta1/signing_pb';
export { BroadcastMode } from '../proto/cosmos/tx/v1beta1/service_pb';
export type TxResponse = cosmos_base_abci_v1beta1_abci_pb.TxResponse.AsObject;
