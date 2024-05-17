import { Config } from "../models/Config";

export interface IConfigurationModifier {
    getConfiguration(config: Config): Config;
}