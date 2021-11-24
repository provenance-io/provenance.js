import { bech32 } from 'bech32';
import { createHash } from 'crypto';
import { parse as uuidParse } from 'uuid';
import { stringify as uuidStringify } from 'uuid';

const PREFIX_SCOPE = 'scope';
const PREFIX_SESSION = 'session';
const PREFIX_RECORD = 'record';
const PREFIX_SCOPE_SPECIFICATION = 'scopespec';
const PREFIX_CONTRACT_SPECIFICATION = 'contractspec';
const PREFIX_RECORD_SPECIFICATION = 'recspec';

const KEY_SCOPE = 0x00;
const KEY_SESSION = 0x01;
const KEY_RECORD = 0x02;
const KEY_SCOPE_SPECIFICATION = 0x04; // Note that this is not in numerical order.
const KEY_CONTRACT_SPECIFICATION = 0x03;
const KEY_RECORD_SPECIFICATION = 0x05;

const BECH32_LENGTH_LIMIT = 256;

export class MetadataAddress {

    constructor(bytes: Buffer) {
        this.bytes = Buffer.from(bytes);
    }

    toString(): string {
        return bech32.encode(
            MetadataAddress.getPrefixFromKey(this.bytes[0]), 
            bech32.toWords(this.bytes),
            BECH32_LENGTH_LIMIT
        );
    }

    getPrimaryUuid(): string {
        return uuidStringify(this.bytes.slice(1, 17));
    }

    isScope(): boolean {
        return (this.bytes[0] === KEY_SCOPE);
    }

    isSession(): boolean {
        return (this.bytes[0] === KEY_SESSION);
    }

    isRecord(): boolean {
        return (this.bytes[0] === KEY_RECORD);
    }

    isScopeSpec(): boolean {
        return (this.bytes[0] === KEY_SCOPE_SPECIFICATION);
    }

    isContractSpec(): boolean {
        return (this.bytes[0] === KEY_CONTRACT_SPECIFICATION);
    }

    isRecordSpec(): boolean {
        return (this.bytes[0] === KEY_RECORD_SPECIFICATION);
    }

    public static fromBech32(value: string): MetadataAddress {
        const decoded = bech32.decode(value, BECH32_LENGTH_LIMIT);
        const bytes = bech32.fromWords(decoded.words);

        var buffer: Buffer = Buffer.alloc(bytes.length, 0x00);
        bytes.forEach((byte, idx) => {
            buffer[idx] = byte;
        });
        MetadataAddress.validateBytes(buffer);

        const prefix = MetadataAddress.getPrefixFromKey(bytes[0]);
        if (decoded.prefix !== prefix) {
            throw new Error(`Incorrect HRP: Expected ${prefix}, actual: ${decoded.prefix}`);
        }

        return new MetadataAddress(buffer);
    }

    public static forScope(scopeUuid: string): MetadataAddress {
        return new MetadataAddress(Buffer.concat([
            Buffer.from([KEY_SCOPE]), 
            MetadataAddress.uuidAsBuffer(scopeUuid)
        ]));
    }

    public static forSession(scopeUuid: string, sessionUuid: string): MetadataAddress {
        return new MetadataAddress(Buffer.concat([
            Buffer.from([KEY_SESSION]), 
            MetadataAddress.uuidAsBuffer(scopeUuid),
            MetadataAddress.uuidAsBuffer(sessionUuid)
        ]));
    }

    public static forRecord(scopeUuid: string, recordName: string): MetadataAddress {
        if (recordName === '') {
            throw new Error(`Invalid recordName: cannot be empty or blank`);
        }

        return new MetadataAddress(Buffer.concat([
            Buffer.from([KEY_RECORD]), 
            MetadataAddress.uuidAsBuffer(scopeUuid),
            MetadataAddress.asHashedBytes(recordName)
        ]));
    }

    public static forScopeSpecification(scopeSpecUuid: string): MetadataAddress {
        return new MetadataAddress(Buffer.concat([
            Buffer.from([KEY_SCOPE_SPECIFICATION]), 
            MetadataAddress.uuidAsBuffer(scopeSpecUuid)
        ]));
    }

    public static forContractSpecification(contractSpecUuid: string): MetadataAddress {
        return new MetadataAddress(Buffer.concat([
            Buffer.from([KEY_CONTRACT_SPECIFICATION]), 
            MetadataAddress.uuidAsBuffer(contractSpecUuid)
        ]));
    }

    public static forRecordSpecification(contractSpecUuid: string, recordSpecName: string): MetadataAddress {
        if (recordSpecName === '') {
            throw new Error(`Invalid recordSpecName: cannot be empty or blank`);
        }

        return new MetadataAddress(Buffer.concat([
            Buffer.from([KEY_RECORD_SPECIFICATION]), 
            MetadataAddress.uuidAsBuffer(contractSpecUuid),
            MetadataAddress.asHashedBytes(recordSpecName)
        ]));
    }

    private static uuidAsBuffer(uuid: string): Buffer {
        var buffer: Buffer = Buffer.alloc(16, 0x00);
        
        const bytes = uuidParse(uuid);
        if (bytes.length !== buffer.length) {
            throw new Error(`Invalid UUID buffer length: Expected ${buffer.length}, actual: ${bytes.length}`);
        }
        for (var i = 0; i < bytes.length; i++) {
            buffer[i] = bytes[i];
        }
        
        return buffer;
    }

    private static asHashedBytes(str: string): Buffer {
        return createHash('sha256').update(str.trim().toLocaleLowerCase()).digest().slice(0, 16);
    }

    private static validateBytes(bytes: Buffer) {
        var expectedLength: number;
        switch(bytes[0]) {
            case KEY_SCOPE: expectedLength = 17; break;
            case KEY_SESSION: expectedLength = 33; break;
            case KEY_RECORD: expectedLength = 33; break;
            case KEY_SCOPE_SPECIFICATION: expectedLength = 17; break;
            case KEY_CONTRACT_SPECIFICATION: expectedLength = 17; break;
            case KEY_RECORD_SPECIFICATION: expectedLength = 33; break;
            default: {
                throw new Error(`Invalid key: ${bytes[0]}`);
            }
        }
        if (expectedLength != bytes.length) {
            throw new Error(`Incorrect data length for type ${MetadataAddress.getPrefixFromKey(bytes[0])}: Expected ${expectedLength}, actual: ${bytes.length}.`)
        }
    }

    private static getPrefixFromKey(key): string {
        var prefix: string;
        switch(key) {
            case KEY_SCOPE: prefix = PREFIX_SCOPE; break;
            case KEY_SESSION: prefix = PREFIX_SESSION; break;
            case KEY_RECORD: prefix = PREFIX_RECORD; break;
            case KEY_SCOPE_SPECIFICATION: prefix = PREFIX_SCOPE_SPECIFICATION; break;
            case KEY_CONTRACT_SPECIFICATION: prefix = PREFIX_CONTRACT_SPECIFICATION; break;
            case KEY_RECORD_SPECIFICATION: prefix = PREFIX_RECORD_SPECIFICATION; break;
            default: {
                throw new Error(`Invalid key: ${key}`);
            }
        }
        return prefix;
    }


    public readonly bytes: Buffer;

}
