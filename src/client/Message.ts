import * as jspb from 'google-protobuf';

import { 
    BroadcastMode, 
    TxResponse, 
} from '../types';
import { GasEstimate } from './GasEstimate';
import { 
    ITxClient, 
    SignerArgument, 
} from './ITxClient';

export class Message {

    constructor(msgs: Array<jspb.Message>, txClient: ITxClient) {
        this.msgs = msgs;
        this.txClient = txClient;
    }

    public broadcastTx(signers: SignerArgument, mode: BroadcastMode = BroadcastMode.BROADCAST_MODE_BLOCK): Promise<TxResponse> {
        return this.txClient.constructEstimateAndBroadcastTx(
            this, 
            () => { return true; }, 
            signers, 
            mode
        );
    }

    public estimateTx(signers: SignerArgument): Promise<GasEstimate> {
        return this.txClient.constructAndEstimateTx(this, signers);
    }

    public msgs: Array<jspb.Message>;

    private readonly txClient: ITxClient;

}
