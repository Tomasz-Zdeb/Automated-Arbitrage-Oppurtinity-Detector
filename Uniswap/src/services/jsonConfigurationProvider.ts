import { readFileSync } from 'fs';
import { IConfigurationSource } from '../interfaces/IConfigurationSource';

export class JsonConfigurationProvider implements IConfigurationSource{
  private readonly configFilePath: string;

  constructor(configFilePath: string){
    this.configFilePath = configFilePath;
  }
  
  getConfiguration(): any{
    const fileContents = readFileSync(this.configFilePath, 'utf-8');
    return JSON.parse(fileContents);
  }
}
