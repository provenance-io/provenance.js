import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';
import * as grpc from 'grpc';

import { BaseRequest } from './BaseRequest';
import { GasEstimate } from './GasEstimate';
import { Message } from './Message';
import { IProvider } from '../providers/IProvider';
import {
    ConstructArgument, 
    EstimateFunction, 
    ITxClient, 
    SignerArgument, 
} from './ITxClient';
import { 
    BroadcastMode, 
    TxResponse, 
} from '../types';
import { messageToAny } from '../utils/MessageUtils';
import { Key } from '../wallet/Key';
import {
    AuthCore,
} from '../core';
import { 
    AttributeModule, 
    MarkerModule, 
    MetadataModule, 
    NameModule, 
} from '../modules';
import { IServiceClient, ServiceClient } from '../proto/cosmos/tx/v1beta1/service_grpc_pb';

import * as cosmos_tx_v1beta1_service_pb from '../proto/cosmos/tx/v1beta1/service_pb';
import * as cosmos_tx_v1beta1_tx_pb from '../proto/cosmos/tx/v1beta1/tx_pb';

export class ProvenanceClient implements ITxClient {

    /**
     * Constructor.
     * @param provider The provenance node network provider.
     */
    constructor(provider: IProvider) {
        this.provider = provider;
        this.txClient = new ServiceClient(this.provider.network.uri.toString(), grpc.credentials.createInsecure());

        // core modules
        this.auth = new AuthCore(this.provider, this);

        // provenance modules
        this.attribute = new AttributeModule(this.provider, this);
        this.marker = new MarkerModule(this.provider, this);
        this.metadata = new MetadataModule(this.provider, this);
        this.name = new NameModule(this.provider, this);
    }

    /**
     * Broadcasts the request.
     * @param baseReq The request containing one or more messages to broadcast.
     * @returns ???
     */
    broadcastTx(baseReq: BaseRequest, gasEstimate: GasEstimate, mode: BroadcastMode = BroadcastMode.BROADCAST_MODE_SYNC): Promise<TxResponse> {
        return new Promise<TxResponse> (async (resolve, reject) => {
            const authInfoBytes = (await baseReq.buildAuthInfo(gasEstimate)).serializeBinary();
            const txBodyBytes = baseReq.body.serializeBinary();

            // calculate the signatures
            var signatures: Array<Buffer> = new Array<Buffer>();
            (await baseReq.buildSignDocBytesList(
                Buffer.from(authInfoBytes), 
                Buffer.from(txBodyBytes)
            )).forEach((signDocBytes, index) => {
                if (baseReq.signers.length < index) {
                    signatures.push(baseReq.signers[index].sign(signDocBytes));
                } else {
                    signatures.push(baseReq.signers[baseReq.signers.length - 1].sign(signDocBytes));
                }
            });

            const txRaw = (new cosmos_tx_v1beta1_tx_pb.TxRaw())
                .setAuthInfoBytes(authInfoBytes)
                .setBodyBytes(txBodyBytes)
                .setSignaturesList(signatures);

            // TODO: Move GRPC unary call to the provider
            // broadcast the transaction
            this.txClient.broadcastTx((new cosmos_tx_v1beta1_service_pb.BroadcastTxRequest()).setTxBytes(txRaw.serializeBinary()).setMode(mode), (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.getTxResponse().toObject());
                }
            });
        });
    }

    /**
     * ???
     * @param baseReq ???
     * @returns ???
     */
    estimateTx(baseReq: BaseRequest): Promise<GasEstimate> {
        return new Promise<GasEstimate> (async (resolve, reject) => {
            const tx = (new cosmos_tx_v1beta1_tx_pb.Tx())
                .setBody(baseReq.body)
                .setAuthInfo(await baseReq.buildAuthInfo());

            // calculate the signatures
            var signatures: Array<Buffer> = new Array<Buffer>();
            (await baseReq.buildSignDocBytesList(
                Buffer.from(tx.getAuthInfo().serializeBinary()), 
                Buffer.from(tx.getBody().serializeBinary())
            )).forEach((signDocBytes, index) => {
                if (baseReq.signers.length < index) {
                    signatures.push(baseReq.signers[index].sign(signDocBytes));
                } else {
                    signatures.push(baseReq.signers[baseReq.signers.length - 1].sign(signDocBytes));
                }
            });

            // add the signatures to the TX message
            tx.setSignaturesList(signatures);

            // TODO: Move GRPC unary call to the provider
            // simulate the transaction
            this.txClient.simulate((new cosmos_tx_v1beta1_service_pb.SimulateRequest()).setTx(tx), (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(new GasEstimate(res.getGasInfo().getGasUsed(), baseReq.gasAdjustment));
                }
            });
        });
    }

    /**
     * ???
     * @param messages ???
     * @param signerArg The signing key(s) for the transaction.
     * @returns ???
     */
    constructWith(messages: Array<Message>, signerArg: SignerArgument): BaseRequest {
        // convert the messages to the protobuf 'any' type
        var msgs: Array<google_protobuf_any_pb.Any> = new Array<google_protobuf_any_pb.Any>();
        messages.forEach((message) => {
            message.msgs.forEach((msg) => {
                msgs.push(messageToAny(msg));
            })
        });

        var signers: Key[] = [].concat(signerArg);
        return new BaseRequest(
            this.provider,
            (new cosmos_tx_v1beta1_tx_pb.TxBody()).setMessagesList(msgs),
            signers
        );
    }

    /**
     * ???
     * @param constructArg ???
     * @param signers The signing key(s) for the transaction.
     * @returns ???
     */
     construct(constructArg: ConstructArgument, signers: SignerArgument): Promise<BaseRequest> {
        return new Promise<BaseRequest>((resolve, reject) => {
            if (typeof constructArg === 'function') {
                constructArg().then((msgs) => {
                    resolve(this.constructWith(msgs, signers));
                }).catch((err) => {
                    reject(err);
                });
            } else {
                if (constructArg.constructor.name === 'Array') {
                    resolve(this.constructWith(constructArg as Message[], signers));
                } else {
                    resolve(this.constructWith([constructArg as Message], signers));
                }
            }
        });
    }

    /**
     * 
     * @param constructArg ???
     * @param signers The signing key(s) for the transaction.
     * @returns ???
     */
    async constructAndEstimateTx(constructArg: ConstructArgument, signers: SignerArgument): Promise<GasEstimate> {
        const baseReq = await this.construct(constructArg, signers);
        return this.estimateTx(baseReq);
    }

    /**
     * ???
     * @param constructArg ???
     * @param gasEstimate ???
     * @param signers The signing key(s) for the transaction.
     * @param mode ???
     * @returns ???
     */
    async constructAndBroadcastTx(
        constructArg: ConstructArgument, 
        gasEstimate: GasEstimate, 
        signers: SignerArgument,
        mode: BroadcastMode = BroadcastMode.BROADCAST_MODE_SYNC
    ): Promise<TxResponse> {
        const baseReq = await this.construct(constructArg, signers);
        return this.broadcastTx(baseReq, gasEstimate, mode);
    }

    /**
     * ???
     * @param constructArg ???
     * @param estimateCallback ???
     * @param signers The signing key(s) for the transaction.
     * @param mode ???
     * @returns ???
     */
    constructEstimateAndBroadcastTx(
        constructArg: ConstructArgument, 
        estimateCallback: EstimateFunction, 
        signers: SignerArgument,
        mode: BroadcastMode = BroadcastMode.BROADCAST_MODE_SYNC
    ): Promise<TxResponse> {
        return new Promise<TxResponse> (async (resolve, reject) => {
            const baseReq = await this.construct(constructArg, signers);
            this.estimateTx(baseReq).then((gasEstimate) => {
                // give the caller an opportunity to opt-out
                if (estimateCallback(gasEstimate)) {
                    // broadcast the transaction
                    this.broadcastTx(baseReq, gasEstimate, mode).then((res) => {
                        resolve(res);
                    }).catch((err) => {
                        reject(err);
                    });
                } else {
                    reject(new Error(`Caller rejected transaction estimate`));
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }

    private readonly provider: IProvider;
    private readonly txClient: IServiceClient;

    // core modules
    public auth: AuthCore;

    // provenance modules
    public attribute: AttributeModule;
    public marker: MarkerModule;
    public metadata: MetadataModule;
    public name: NameModule;

}
