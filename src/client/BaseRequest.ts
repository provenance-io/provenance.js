import { AuthInfo, SignMode } from '../types';
import { AuthCore } from '../core';
import { GasEstimate } from './GasEstimate';
import { messageToAny } from '../utils/MessageUtils';
import { Key } from '../wallet/Key';
import { IProvider } from '../providers/IProvider';

import * as cosmos_base_v1beta1_coin_pb from '../proto/cosmos/base/v1beta1/coin_pb';
import * as cosmos_crypto_secp256k1_keys_pb from '../proto/cosmos/crypto/secp256k1/keys_pb';
import * as cosmos_tx_v1beta1_tx_pb from "../proto/cosmos/tx/v1beta1/tx_pb";

const DEFAULT_GAS_DENOM = 'nhash';

export class BaseRequest {

    constructor(
        provider: IProvider,
        body: cosmos_tx_v1beta1_tx_pb.TxBody,
        signers: Key[],
        signerSequenceOffsets?: number[],
        gasAdjustment?: number,
        feeGranter?: string,
    ) {
        this.provider = provider;
        this.chainId = this.provider.network.chainId;
        this.body = body;
        this.signers = signers;
        this.signerSequenceOffsets = signerSequenceOffsets;
        this.gasAdjustment = gasAdjustment;
        this.feeGranter = feeGranter;
    }

    buildAuthInfo(gasEstimate: GasEstimate = new GasEstimate(0)): Promise<cosmos_tx_v1beta1_tx_pb.AuthInfo> {
        return new Promise<cosmos_tx_v1beta1_tx_pb.AuthInfo>(async (resolve, reject) => {
            try {
                var signerInfos: cosmos_tx_v1beta1_tx_pb.SignerInfo[] = [];

                await this.signers.reduce(async (promise, signer, idx) => {
                    try {
                        await promise;

                        const sequenceOffset = ((typeof this.signerSequenceOffsets !== 'undefined') ? this.signerSequenceOffsets[idx] : 0);
                        
                        signer.baseAccount = await AuthCore.getBaseAccount(this.provider, signer.address);

                        signerInfos.push((new cosmos_tx_v1beta1_tx_pb.SignerInfo())
                            .setPublicKey(messageToAny((new cosmos_crypto_secp256k1_keys_pb.PubKey())
                                .setKey(signer.publicKeyData)
                            ))
                            .setModeInfo((new cosmos_tx_v1beta1_tx_pb.ModeInfo())
                                .setSingle((new cosmos_tx_v1beta1_tx_pb.ModeInfo.Single())
                                    .setMode(SignMode.SIGN_MODE_DIRECT)
                                )
                            )
                            .setSequence(signer.baseAccount.sequence + sequenceOffset)
                        );
                    } catch (ex) {
                        Promise.reject(ex);
                    }
                }, Promise.resolve());

                resolve((new cosmos_tx_v1beta1_tx_pb.AuthInfo())
                    .setFee((new cosmos_tx_v1beta1_tx_pb.Fee())
                        .setAmountList([(new cosmos_base_v1beta1_coin_pb.Coin())
                            .setAmount(gasEstimate.fees.toString())
                            .setDenom(DEFAULT_GAS_DENOM)
                        ])
                        .setGasLimit(gasEstimate.limit)
                    )
                    .setSignerInfosList(signerInfos)
                );
            } catch (ex) {
                reject(ex);
            }
        });
    }

    buildSignDocList(authInfoBytes: Buffer, bodyBytes: Buffer): Promise<Array<cosmos_tx_v1beta1_tx_pb.SignDoc>> {
        return new Promise<Array<cosmos_tx_v1beta1_tx_pb.SignDoc>>(async (resolve, reject) => {
            try {
                var signDocList: Array<cosmos_tx_v1beta1_tx_pb.SignDoc> = new Array<cosmos_tx_v1beta1_tx_pb.SignDoc>();

                await this.signers.reduce(async (promise, signer) => {
                    try {
                        await promise;

                        if (signer.baseAccount === undefined) {
                            signer.baseAccount = await AuthCore.getBaseAccount(this.provider, signer.address);
                        }

                        signDocList.push((new cosmos_tx_v1beta1_tx_pb.SignDoc)
                            .setBodyBytes(bodyBytes)
                            .setAuthInfoBytes(authInfoBytes)
                            .setChainId(this.chainId)
                            .setAccountNumber(signer.baseAccount.accountNumber)
                        );
                    } catch (ex) {
                        Promise.reject(ex);
                    }
                }, Promise.resolve());

                resolve(signDocList);
            } catch (ex) {
                reject(ex);
            }
        });
    }

    buildSignDocBytesList(authInfoBytes: Buffer, bodyBytes: Buffer): Promise<Array<Buffer>> {
        return new Promise<Array<Buffer>>(async (resolve, reject) => {
            var signDocBytesList: Array<Buffer> = new Array<Buffer>();
            (await this.buildSignDocList(authInfoBytes, bodyBytes)).forEach((signDoc) => {
                signDocBytesList.push(Buffer.from(signDoc.serializeBinary()));
            });

            resolve(signDocBytesList);
        });
    }

    public chainId: string;
    public body: cosmos_tx_v1beta1_tx_pb.TxBody;
    public signers: Key[];
    public signerSequenceOffsets?: number[];
    public gasAdjustment?: number;
    public feeGranter?: string;

    private readonly provider: IProvider;

}
