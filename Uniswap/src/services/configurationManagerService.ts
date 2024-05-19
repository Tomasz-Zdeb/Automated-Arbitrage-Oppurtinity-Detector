import { IConfigurationSource } from '../interfaces/IConfigurationSource';
import { Config } from '../models/Config';

export class ConfigurationManagerService implements IConfigurationSource {

  private configuration: Config;

  constructor(fileConfigurationProvider: IConfigurationSource, 
    commandLineParser?: IConfigurationSource
  ) {
    this.configuration = fileConfigurationProvider.getConfiguration();
    //TODO IMPLEMENT CONDITIONAL FETCHING FOR COMMAND LINE PARSER IF IT WAS PASSED TO CTOR
  }

  //IMPLEMENT PRIVATE METHOD THAT WILL BE INVOKED IN CONSTRUCTOR THAT OVERRIDES/ADDSCONFIG
  //FROM COMMAND LINE.

  getConfiguration(): Config{
    return this.configuration;
  }
}