import { bech32 } from 'bech32';
import * as bip32 from 'bip32';
import { createHash } from 'crypto';
import * as RIPEMD160 from 'ripemd160';

export class Key {

    constructor(hrp: string, key: bip32.BIP32Interface) {
        this.hrp = hrp;
        this.key = key;
    }

    get address(): string {
        const hash = Key.sha256hash160(this.key.publicKey);
        return bech32.encode(this.hrp, bech32.toWords(hash));
    }

    get publicKey(): string {
        return this.key.publicKey.toString('hex');
    }

    get privateKey(): string {
        // TODO: not right
        return this.key.privateKey.toString('base64');
    }

    private readonly hrp: string;
    private readonly key: bip32.BIP32Interface;

    private static sha256hash160(input: Buffer): Buffer {
        const sha256 = createHash('sha256').update(input).digest();
        const ripemd160 = new RIPEMD160();
        return ripemd160.update(sha256).digest();
    }

}
