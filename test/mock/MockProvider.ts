import { IProvider } from "../../src/providers/IProvider";
import { Network } from '../../src/types/Network';

export class MockProvider implements IProvider {

    constructor() {
        this.network = {
            //uri: 'piomock1:9090',
            //chainId: 'piomock1'
            uri: 'localhost:9090',
            chainId: 'chain-local'
        };
    }

    readonly network: Network;

}
