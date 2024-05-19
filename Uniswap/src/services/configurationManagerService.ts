import { IConfigurationSource } from '../interfaces/IConfigurationSource';
import { Config } from '../models/Config';

export class ConfigurationManagerService implements IConfigurationSource {

  private configuration: Config;

  constructor(configurationSource: IConfigurationSource) {
    this.configuration = configurationSource.getConfiguration();
  }

  getConfiguration(): Config{
    return this.configuration;
  }
}