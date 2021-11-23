import * as jspb from 'google-protobuf';
import * as google_protobuf_any_pb from 'google-protobuf/google/protobuf/any_pb';

import { MessageTypeMap } from './MessageTypeMap';

const UNKNOWN_TYPE_URL = 'UnknownType';


export function getMessageTypeUrl(msg: jspb.Message): string {
    var typeUrl: string = UNKNOWN_TYPE_URL;

    for (var idx = 0; idx < MessageTypeMap.length && typeUrl === UNKNOWN_TYPE_URL; idx++) {
        if (msg.constructor === MessageTypeMap[idx].type) {
            typeUrl = `/${MessageTypeMap[idx].typeUrl}`;
        }
    }

    return typeUrl;
}

export function messageToAny(msg: jspb.Message, typeUrlPrefix: string = ''): google_protobuf_any_pb.Any {
    var anyMsg = new google_protobuf_any_pb.Any();
    anyMsg.setValue(msg.serializeBinary());
    anyMsg.setTypeUrl(`${typeUrlPrefix}${getMessageTypeUrl(msg)}`);
    return anyMsg;
}

export function anyToMessage(obj: google_protobuf_any_pb.Any, typeUrlPrefix: string = ''): jspb.Message | undefined {
    var msg: jspb.Message = undefined;

    for (var idx = 0; idx < MessageTypeMap.length && msg === undefined; idx++) {
        if (obj.getTypeUrl() === `/${MessageTypeMap[idx].typeUrl}`) {
            msg = MessageTypeMap[idx].type.deserializeBinary(obj.getValue());
        }
    }

    return msg;
}
