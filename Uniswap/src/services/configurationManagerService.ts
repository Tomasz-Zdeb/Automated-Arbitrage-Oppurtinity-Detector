import { IConfigurationSource } from '../interfaces/IConfigurationSource';
import { Config } from '../models/Config';
import { IConfigurationModifier } from '../interfaces/IConfigurationModifier';
import { App } from '../App';
import { IncorrectValueError } from '../models/IncorrectValueError';

export class ConfigurationManagerService implements IConfigurationSource {
  private configuration: Config;
  

  constructor(app: App, fileConfigurationProvider: IConfigurationSource, 
    commandLineParser?: IConfigurationModifier
  ) {
    if (commandLineParser) {
      try {
        this.configuration = commandLineParser.getConfiguration(fileConfigurationProvider.getConfiguration());
      } catch (e) {
        console.error(`An error occured during parsing command line arguments, falling back to the static config from file! Error: ${e}`)
        this.configuration = fileConfigurationProvider.getConfiguration();
      }
    } else {
      this.configuration = fileConfigurationProvider.getConfiguration();
    }
  }

  getConfiguration(): Config{
    return this.configuration;
  }
}