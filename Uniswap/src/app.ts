import { IDataSource } from './interfaces/IDataSource'
import { IDataWriter } from './interfaces/IDataWriter'
import { IDataProcessor } from './interfaces/IDataProcessor'
import { IExecutor } from './interfaces/IExecutor'
import { IConfigurationSource } from './interfaces/IConfigurationSource'
import { JsonConfigurationProvider } from './services/JsonConfigurationProvider'
import { DataProcessorService } from './services/DataProcessorService'
import { DataWriterMock } from './mocks/DataWriterMock'
import { Logger } from './services/Logger'
import { ConfigurationManagerService } from './services/ConfigurationManagerService'
import { ILogger } from './interfaces/ILogger'
import { UniswapDataFetchService } from './services/UniswapDataFetchService'
import { ethers } from 'ethers'
import { Config } from './models/Config'
import { Fee } from './enums/Fee'
import { ExecutorService} from './services/ExecutorService';
import { SchedulerService } from './services/SchedulerService'
import { IScheduler } from './interfaces/IScheduler'

export class App {
    private readonly configurationSource: IConfigurationSource;
    private readonly dataSource: IDataSource;
    private readonly dataProcessor: IDataProcessor;
    private readonly dataWriter: IDataWriter;
    private readonly executor: IExecutor;
    private readonly logger: ILogger;
    private readonly scheduler: IScheduler;

    private config: Config;

    public static readonly defaultConfigPath: string = './config.json'

    constructor() {
        try {
            this.configurationSource = new ConfigurationManagerService(new JsonConfigurationProvider(App.defaultConfigPath))
            this.config = this.configurationSource.getConfiguration();

            this.logger = new Logger({level: this.config.loggerLevel, filename: this.config.loggerFilename});
            this.logger.debug('Logger initialized - Timestamps display UTC Time!');
            this.logger.debug(`Configuration: ${JSON.stringify(this.config, null, 2)}`);

            this.dataSource = new UniswapDataFetchService(this);
            this.logger.debug(`Data source initialized: ${this.dataSource.constructor.name}`);

            this.dataProcessor = new DataProcessorService(this);
            this.logger.debug(`Data processor initialized: ${this.dataProcessor.constructor.name}`);

            this.dataWriter = new DataWriterMock(this);
            this.logger.debug(`Data writer initialized: ${this.dataWriter.constructor.name}`);

            this.executor = new ExecutorService(this);
            this.logger.debug(`Executor initialized ${this.executor.constructor.name}`);

            this.scheduler = new SchedulerService(this);
            this.logger.debug(`Scheduler initialized ${this.scheduler.constructor.name}`);

            this.logger.debug('Application initialized succesfully! Ready to run');
        } catch (e) {
            console.error('Failed to initialize the application', e);
            throw e;
        }
    }

    public getLogger(): ILogger {
        return this.logger;
    }

    public getConfiguration(): Config {
        return this.config;
    }

    public getDataSource(): IDataSource {
        return this.dataSource;
    }

    public getDataProcessor(): IDataProcessor {
        return this.dataProcessor;
    }

    public getDataWritter(): IDataWriter {
        return this.dataWriter;
    }

    public getExecutor(): IExecutor {
        return this.executor;
    }

    public async run(): Promise<void>{
        this.logger.info('Starting the application');
        try {
            this.scheduler.addJob(this.executor.run.bind(this.executor))
            this.scheduler.startAllJobs();
        }   catch (e) {
            this.logger.error(`shit happens ${e}`);
        }
    }


    // let a = await this.dataSource.getQuote(this.config.tokenConfigs[0].address,
    //     this.config.tokenConfigs[1].address,
    //     Number(Fee[this.config.tokenConfigs[0].fee]),
    //     ethers.parseUnits('1',this.config.tokenConfigs[0].decimals))
    // this.logger.warn(` A ===========> ${a}`);  


    // quoteWithExplicitParameters(quoterContract, WETH, USDC, FeeAmount.LOW, ethers.parseUnits(initialAmount.toString(),18));
}