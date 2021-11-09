import { Network } from '../types/Network';
import { IProvider } from "./IProvider";

export class GrpcProvider implements IProvider {

    constructor(network: Network) {
        this.network = network;
    }

    readonly network: Network;

}
