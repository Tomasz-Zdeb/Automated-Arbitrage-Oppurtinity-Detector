import { StaticConfiguration } from './staticConfiguration'
import { DynamicConfiguration } from './dynamicConfiguration'

export class Configuration{
    public readonly staticConfiguration: StaticConfiguration;
    public readonly dynamicConfiguration: DynamicConfiguration;

    constructor(staticConfiguration: StaticConfiguration,
        dynamicConfiguration: DynamicConfiguration
    ){
        this.staticConfiguration = staticConfiguration;
        this.dynamicConfiguration = dynamicConfiguration;
    }
}