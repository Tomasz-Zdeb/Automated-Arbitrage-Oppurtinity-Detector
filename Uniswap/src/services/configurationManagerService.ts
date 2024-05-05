import { IConfigurationSource } from '../interfaces/IConfigurationSource';

export class ConfigurationManagerService implements IConfigurationSource {

  private configuration: any;

  constructor(fileConfigurationProvider: IConfigurationSource, 
    commandLineParser?: IConfigurationSource
  ) {
    this.configuration = fileConfigurationProvider.getConfiguration();
    //TODO IMPLEMENT CONDITIONAL FETCHING FOR COMMAND LINE PARSER IF IT WAS PASSED TO CTOR
  }

  //IMPLEMENT PRIVATE METHOD THAT WILL BE INVOKED IN CONSTRUCTOR THAT OVERRIDES/ADDSCONFIG
  //FROM COMMAND LINE.

  getConfiguration(): any{
    return this.configuration;
  }
}