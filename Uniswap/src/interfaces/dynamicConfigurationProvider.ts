import { DynamicConfiguration } from '../models/dynamicConfiguration'

export interface DynamicConfigurationProvider{
    getConfiguration(): DynamicConfiguration;
}