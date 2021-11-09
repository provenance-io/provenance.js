import * as cosmos_base_v1beta1_coin_pb from '../proto/cosmos/base/v1beta1/coin_pb';
import * as cosmos_bank_v1beta1_bank_pb from "../proto/cosmos/bank/v1beta1/bank_pb";

export type Coin = cosmos_base_v1beta1_coin_pb.Coin.AsObject;
export type Metadata = cosmos_bank_v1beta1_bank_pb.Metadata.AsObject;
