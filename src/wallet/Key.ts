import { bech32 } from 'bech32';
import * as bip32 from 'bip32';
import { createHash } from 'crypto';
import RIPEMD160 from 'ripemd160';

import { ISigner } from './ISigner';
import { BaseAccount } from '../types/Cosmos';

const LEGACY_DIME_CURVE = "secp256k1";

export class Key implements ISigner {

    constructor(hrp: string, key: bip32.BIP32Interface, mainnet: boolean) {
        this.hrp = hrp;
        this.key = key;
        this.mainnet = mainnet;
    }

    get address(): string {
        const hash = Key.sha256hash160(this.key.publicKey);
        return bech32.encode(this.hrp, bech32.toWords(hash));
    }

    get publicKey(): string {
        return this.key.publicKey.toString('hex');
    }

    get publicKeyData(): Buffer {
        return this.key.publicKey;
    }

    set baseAccount(account: BaseAccount) {
        this.account = account;
    }

    get baseAccount(): BaseAccount {
        return this.account;
    }

    sign(bytes: Buffer): Buffer {
        return this.key.sign(Key.sha256(bytes));
    }

    private readonly hrp: string;
    private readonly key: bip32.BIP32Interface;
    private readonly mainnet: boolean;

    private account?: BaseAccount = undefined;

    private static sha256(input: Buffer): Buffer {
        return createHash('sha256').update(input).digest();
    }

    private static sha256hash160(input: Buffer): Buffer {
        const sha256 = Key.sha256(input);
        const ripemd160 = new RIPEMD160();
        return ripemd160.update(sha256).digest();
    }

}
