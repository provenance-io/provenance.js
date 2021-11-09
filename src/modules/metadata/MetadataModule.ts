import { IProvider } from '../../providers/IProvider';

export class MetadataModule {

    constructor(provider: IProvider) {
        this.provider = provider;
    }

    private readonly provider: IProvider;

};
