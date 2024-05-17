import { IConfigurationModifier } from '../interfaces/IConfigurationModifier'
import { Config } from '../models/Config';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { IncorrectValueError } from '../models/IncorrectValueError';
import { TokenConfig } from '../models/TokenConfig';
import { ChainId } from '@uniswap/sdk-core';

export class CommandLineConfigurationProvider implements IConfigurationModifier{

    private getCommandLineArgs():any {
        const argv = yargs(hideBin(process.argv))
                .parserConfiguration({
                    'camel-case-expansion': false
                })
                .argv;
        return argv;
    }

    private validateArgs(argv: any, config: Config): void {
    
        if (Array.isArray(argv._) && argv._.length !== 0) {
            throw new IncorrectValueError(`Arguments must be passed as --key=value. Incorrect format of arguments detected: ${argv._}`)
        }
    
        for (const key in argv) {
            if (argv.hasOwnProperty(key) && key !== '$0' && key !== '_') {
                if (!config.hasOwnProperty(key) || key == `tokens` || key == `tokenConfigs`) {
                    throw new IncorrectValueError(`Unknown or unsupported configuration property passed: ${key}`)
                }
            }
        }

    }

    private parseArgumentsToConfig(argv: any, config: Config): Config {
        return new Config(
            argv.hasOwnProperty('loggerLevel') ? argv['loggerLevel'] : config.loggerLevel,
            argv.hasOwnProperty('loggerFilename') ? argv['loggerFilename'] : config.loggerFilename,
            argv.hasOwnProperty('jsonRpcProvider') ? argv['jsonRpcProvider'] : config.jsonRpcProvider,
            argv.hasOwnProperty('quoterContractAddress') ? argv['quoterContractAddress'] : config.quoterContractAddress,
            [{chainId:config.tokenConfigs[0].chainId.toString(),
                address:config.tokenConfigs[0].address.toString(),
                decimals:config.tokenConfigs[0].decimals ,
                symbol:config.tokenConfigs[0].symbol.toString(),
                name:config.tokenConfigs[0].name.toString(),
                fee:config.tokenConfigs[0].fee},
            {chainId:config.tokenConfigs[1].chainId.toString(),
                address:config.tokenConfigs[1].address.toString(),
                decimals:config.tokenConfigs[1].decimals ,
                symbol:config.tokenConfigs[1].symbol.toString(),
                name:config.tokenConfigs[1].name.toString(),
                fee:config.tokenConfigs[1].fee},
            {chainId:config.tokenConfigs[2].chainId.toString(),
                address:config.tokenConfigs[2].address.toString(),
                decimals:config.tokenConfigs[2].decimals,
                symbol:config.tokenConfigs[2].symbol.toString(),
                name:config.tokenConfigs[2].name.toString(),
                fee:config.tokenConfigs[2].fee}],
            argv.hasOwnProperty('schedulerConfig') ? argv['schedulerConfig'] : config.schedulerConfig,
            argv.hasOwnProperty('schedulerTimeout') ? argv['schedulerTimeout'] : config.schedulerTimeout,
            argv.hasOwnProperty('tokenBaseAmount') ? argv['tokenBaseAmount'] : config.tokenBaseAmount);
    }

    public getConfiguration(config: Config): Config {
        const argv = this.getCommandLineArgs();
        this.validateArgs(argv,config);
        return this.parseArgumentsToConfig(argv,config);
    }
}