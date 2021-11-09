import * as jspb from 'google-protobuf';
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

import { IProvider } from '../providers/IProvider';
import { Key } from '../wallet/Key';
import { AttributeModule, MarkerModule, MetadataModule, NameModule } from '../modules';

import * as cosmos_tx_v1beta1_tx_pb from "../proto/cosmos/tx/v1beta1/tx_pb";

export type ConstructFunction = (msgs: Array<jspb.Message>) => void;

export class ProvenanceClient {

    constructor(provider: IProvider) {
        this.provider = provider;

        this.attribute = new AttributeModule(this.provider);
        this.marker = new MarkerModule(this.provider);
        this.metadata = new MetadataModule(this.provider);
        this.name = new NameModule(this.provider);
    }

    broadcastTx(txBody: cosmos_tx_v1beta1_tx_pb.TxBody, signer: Key): Promise<void> {
        return new Promise<void> ((resolve, reject) => {
            // TODO
        });
    }

    construct(callback: ConstructFunction): cosmos_tx_v1beta1_tx_pb.TxBody {
        var msgs: Array<jspb.Message> = new Array<jspb.Message>();
        callback(msgs);

        const req = (new cosmos_tx_v1beta1_tx_pb.TxBody())
            .setMessagesList(msgs);
        return req;
    }

    constructAndBroadcastTx(callback: ConstructFunction, signer: Key): Promise<void> {
        const txBody = this.construct(callback);
        return this.broadcastTx(txBody, signer);
    }

    private readonly provider: IProvider;

    public attribute: AttributeModule;
    public marker: MarkerModule;
    public metadata: MetadataModule;
    public name: NameModule;

}
