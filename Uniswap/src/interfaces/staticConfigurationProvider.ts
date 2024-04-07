import { StaticConfiguration } from "../models/staticConfiguration";

export interface StaticConfigurationProvider{
    getConfiguration(): StaticConfiguration;
}