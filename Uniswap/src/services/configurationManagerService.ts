import { IConfigurationSource } from '../interfaces/IConfigurationSource';
import { Config } from '../models/Config';

export class ConfigurationManagerService implements IConfigurationSource {

  private configuration: Config;

  constructor(fileConfigurationProvider: IConfigurationSource, 
    commandLineParser?: IConfigurationSource
  ) {
    this.configuration = fileConfigurationProvider.getConfiguration();
  }

  getConfiguration(): Config{
    return this.configuration;
  }
}