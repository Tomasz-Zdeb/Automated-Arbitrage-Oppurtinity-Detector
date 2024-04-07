import { DynamicConfigurationProvider } from '../interfaces/dynamicConfigurationProvider'
import { DynamicConfiguration } from '../models/dynamicConfiguration'

export class CommandLineConfigurationProvider implements DynamicConfigurationProvider {
    public getConfiguration(): DynamicConfiguration{

        console.log("CommandLineConfigurationProvider.getConfiguration() - NOT IMPLEMENTED");
        return new DynamicConfiguration();
    }
}