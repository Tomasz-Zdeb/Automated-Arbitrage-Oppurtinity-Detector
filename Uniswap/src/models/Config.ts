import { TokenConfig } from './TokenConfig';
import { Fee } from '../enums/Fee';
import { ConfigParseError } from './ConfigParseError';

export class Config {
    readonly loggerLevel: string;
    readonly loggerFilename: string;
    readonly jsonRpcProvider: string;
    readonly quoterContractAddress: string;
    readonly tokenConfigs: TokenConfig[];

    constructor(
        loggerLevel: string,
        loggerFilename: string,
        jsonRpcProvider: string,
        quoterContractAddress: string,
        tokenConfigs: {
            chainId: string,
            address: string,
            decimals: number,
            symbol: string,
            name: string,
            fee: Fee,
            explorerLink?: string
        }[]
    ) {
        if (!loggerLevel) throw new ConfigParseError("Failed to parse the configuration - 'loggerLevel' configuration missing or it's incorrect");
        if (!loggerFilename) throw new ConfigParseError("Failed to parse the configuration - 'loggerFilename' configuration missing or it's incorrect");
        if (!jsonRpcProvider) throw new ConfigParseError("Failed to parse the configuration - 'jsonRpcProvider' configuration missing or it's incorrect");
        if (!quoterContractAddress) throw new ConfigParseError("Failed to parse the configuration - 'quoterContractAddress' configuration missing or it's incorrect");
        if (!tokenConfigs || tokenConfigs.length !== 3) throw new ConfigParseError("Failed to parse the configuration - 'tokens' configuration missing or it's incorrect");

        this.loggerLevel = loggerLevel;
        this.loggerFilename = loggerFilename;
        this.jsonRpcProvider = jsonRpcProvider;
        this.quoterContractAddress = quoterContractAddress;
        this.tokenConfigs = tokenConfigs.map(token => new TokenConfig(
            token.chainId as any, 
            token.address,
            token.decimals,
            token.symbol,
            token.name,
            token.fee,
            token.explorerLink
        ));
    }
}
