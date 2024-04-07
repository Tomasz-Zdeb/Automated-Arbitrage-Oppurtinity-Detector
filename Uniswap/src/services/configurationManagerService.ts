import { ConfigurationManager } from '../interfaces/configurationManager'
import { DynamicConfigurationProvider } from '../interfaces/dynamicConfigurationProvider'
import { StaticConfigurationProvider } from '../interfaces/staticConfigurationProvider'
import { Configuration } from '../models/Configuration';

export class ConfigurationManagerService implements ConfigurationManager {
  private readonly configuration: Configuration;

  constructor(staticConfigurationProvider: StaticConfigurationProvider, 
    dynamicConfigurationProvider: DynamicConfigurationProvider,
  ) {
    this.configuration = new Configuration(staticConfigurationProvider.getConfiguration(),
      dynamicConfigurationProvider.getConfiguration());
  }

  getConfiguration(): Configuration {
    return this.configuration;
  }
}