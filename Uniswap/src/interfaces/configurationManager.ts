import { Configuration } from "../models/Configuration";

export interface ConfigurationManager {
    getConfiguration(): Configuration;
}