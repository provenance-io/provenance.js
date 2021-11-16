import { BaseRequest } from './BaseRequest';
import { GasEstimate } from './GasEstimate';
import { Message } from './Message';
import { 
    BroadcastMode, 
    TxResponse 
} from '../types';
import { Key } from '../wallet/Key';

export type ConstructFunction = () => Promise<Array<Message>>;
export type EstimateFunction = (gasEstimate: GasEstimate) => boolean;

export type ConstructArgument = ConstructFunction | Array<Message> | Message;
export type SignerArgument = Key | Array<Key>;

export interface ITxClient {

    /**
     * 
     * @param messages 
     * @param signerArg 
     */
    constructWith(messages: Array<Message>, signerArg: SignerArgument): BaseRequest;

    /**
     * 
     * @param constructArg 
     * @param signers 
     */
    construct(constructArg: ConstructArgument, signers: SignerArgument): Promise<BaseRequest>;
    
    /**
     * 
     * @param constructArg 
     * @param gasEstimate 
     * @param signers 
     * @param mode 
     */
    constructAndBroadcastTx(
        constructArg: ConstructArgument, 
        gasEstimate: GasEstimate, 
        signers: SignerArgument, 
        mode: BroadcastMode, 
    ): Promise<TxResponse>;

    /**
     * 
     * @param constructArg 
     * @param estimateCallback 
     * @param signers 
     * @param mode 
     */
    constructEstimateAndBroadcastTx(
        constructArg: ConstructArgument, 
        estimateCallback: EstimateFunction, 
        signers: SignerArgument, 
        mode: BroadcastMode, 
    ): Promise<TxResponse>;

    /**
     * Broadcasts the request.
     * @param baseReq 
     * @param gasEstimate 
     * @param mode 
     */
     broadcastTx(
        baseReq: BaseRequest, 
        gasEstimate: GasEstimate, 
        mode: BroadcastMode
    ): Promise<TxResponse>;

    /**
     * Estimates the gas costs to broadcast the request.
     * @param baseReq 
     */
    estimateTx(baseReq: BaseRequest): Promise<GasEstimate>;

}
