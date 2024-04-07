import { StaticConfigurationProvider } from '../interfaces/staticConfigurationProvider';
import { StaticConfiguration } from '../models/staticConfiguration';
import { readFileSync } from 'fs';

export class JsonConfigurationProvider implements StaticConfigurationProvider{
  private readonly configFilePath: string;

  constructor(configFilePath: string){
    this.configFilePath = configFilePath;
  }
  
  getConfiguration(): StaticConfiguration {
    const fileContents = readFileSync(this.configFilePath, 'utf-8');
    const configJson = JSON.parse(fileContents);

    var config = new StaticConfiguration(configJson.jsonRpcProvider,
      configJson.quoterContractAddress,
      configJson.tokens);
      
    return config;
  }
}
