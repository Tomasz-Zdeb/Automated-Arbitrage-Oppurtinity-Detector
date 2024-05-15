import { Config } from "../models/Config";

export interface IConfigurationSource {
    getConfiguration(): Config;
}