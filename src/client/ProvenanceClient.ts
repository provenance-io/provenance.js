import { IProvider } from '../providers/IProvider';
import { AttributeModule, MarkerModule, MetadataModule, NameModule } from '../modules';

export class ProvenanceClient {

    constructor(provider: IProvider) {
        this.provider = provider;

        this.attribute = new AttributeModule(this.provider);
        this.marker = new MarkerModule(this.provider);
        this.metadata = new MetadataModule(this.provider);
        this.name = new NameModule(this.provider);
    }

    private readonly provider: IProvider;

    public attribute: AttributeModule;
    public marker: MarkerModule;
    public metadata: MetadataModule;
    public name: NameModule;

}
