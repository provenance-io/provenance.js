import * as jspb from 'google-protobuf';
import { eachSeries } from 'async';

import { 
    Message, 
    ITxClient, 
} from '../../client';
import { IProvider } from '../../providers/IProvider';
import { NameRecord } from '../../types';
import { NameModule } from "./NameModule";

export class NameModuleExtensions extends NameModule {

    constructor(provider: IProvider, txClient: ITxClient) {
        super(provider, txClient);
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // TX Extensions
    //----------------------------------------------------------------------------------------------------------------------------------------------

    async bindNamePath(namePath: string, owner: string): Promise<Message> {
        return new Promise<Message>((resolve, reject) => {
            var msgs: Array<jspb.Message> = new Array<jspb.Message>();

            // split name path into segments
            const names = namePath.split('.').reverse();

            // capture the root name/address that exists on chain
            var parent: NameRecord = {
                name: '',
                address: '',
                restricted: false
            };

            // find the root name/address (NameRecord)
            eachSeries(names, (name, callback) => {
                var checkName: string = parent.name;
                if (checkName === '') {
                    checkName = name;
                } else {
                    checkName = `${name}.${checkName}`;
                }

                this.resolveName(checkName).then((addr) => {
                    parent.name = checkName;
                    parent.address = addr;
                    callback();
                }).catch((err) => {
                    callback(new Error());
                });
            }, (err) => {
                const rootNames = parent.name.split('.').reverse();
                var record: NameRecord;
                for (var idx = rootNames.length; idx < names.length; idx++) {
                    record = {
                        name: names[idx],
                        address: owner,
                        restricted: false
                    };
                    parent.address = owner;
                    msgs = msgs.concat(this.bindName(record, parent).msgs);
                    parent = {
                        name: `${record.name}.${parent.name}`,
                        address: record.address,
                        restricted: record.restricted
                    };
                }

                resolve(new Message(msgs, this.txClient));
            });
        });
    }

    deleteNamePath(namePath: string, numElems: number, addr: string): Message {
        if (namePath.split('.').length < numElems) {
            throw new Error(`Invalid number of elements ${numElems} in name path ${namePath}`);
        }

        var msgs: Array<jspb.Message> = new Array<jspb.Message>();
        for (var idx = 0; idx < numElems; idx++) {
            msgs = msgs.concat(this.deleteName(namePath.split('.').slice(idx).join('.'), addr).msgs);
        }

        return new Message(msgs, this.txClient);
    }

}
