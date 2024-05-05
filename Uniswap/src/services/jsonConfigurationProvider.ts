import { readFileSync } from 'fs';
import { IConfigurationSource } from '../interfaces/IConfigurationSource';
import { Config } from '../models/Config';
import { ConfigFileReadError } from '../models/ConfigFileReadError'
import { ConfigParseError } from '../models/ConfigParseError'

export class JsonConfigurationProvider implements IConfigurationSource{
  private readonly configFilePath: string;
  private readonly configFileContents: string;
  private readonly config: Config;

  constructor(configFilePath: string){
    this.configFilePath = configFilePath;

    try{
      this.configFileContents = readFileSync(this.configFilePath, 'utf-8');
    } catch (e) {
      throw new ConfigFileReadError("Failed to read the configuration file");
    }

    try{
      this.config = this.parseConfiguration(this.configFileContents);
    } catch (e) {
      if (!(e instanceof ConfigParseError)){
          throw new ConfigParseError("Failed to parse the configuration")
      }
      throw e;
    }
  }
  
  private parseConfiguration(configFileContents: string): Config {
    let tmpSource = JSON.parse(configFileContents);

  
    let tmpResult = new Config(tmpSource.loggerLevel,
      tmpSource.loggerFilename,
      tmpSource.jsonRpcProvider,
      tmpSource.quoterContractAddress,
      tmpSource.tokens
    )

    return tmpResult;
  }

  getConfiguration(): Config{
    return this.config;
  }
}
