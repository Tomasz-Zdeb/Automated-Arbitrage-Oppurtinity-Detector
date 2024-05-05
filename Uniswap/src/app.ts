import { IDataSource } from './interfaces/IDataSource'
import { IDataWriter } from './interfaces/IDataWriter'
import { IDataProcessor } from './interfaces/IDataProcessor'
import { IExecutor } from './interfaces/IExecutor'
import { IConfigurationSource } from './interfaces/IConfigurationSource'
import { JsonConfigurationProvider } from './services/JsonConfigurationProvider'
import { DataSourceMock } from './mocks/DataSourceMock'
import { DataProcessorMock } from './mocks/DataProcessorMock'
import { DataWriterMock } from './mocks/DataWriterMock'
import { ExecutorMock } from './mocks/ExecutorMock'
import { Logger } from './services/Logger'
import { ConfigurationManagerService } from './services/ConfigurationManagerService'
import { ILogger } from './interfaces/ILogger'

export class App {
    private readonly configurationSource: IConfigurationSource;
    private readonly dataRepository: IDataSource;
    private readonly dataProcessor: IDataProcessor;
    private readonly dataWriter: IDataWriter;
    private readonly executor: IExecutor;
    private readonly logger: ILogger;

    private configuration: any;

    public static readonly defaultConfigPath: string = './config.json'

    constructor() {
        try {
            this.configurationSource = new ConfigurationManagerService(new JsonConfigurationProvider(App.defaultConfigPath))
            this.configuration = this.configurationSource.getConfiguration();

            this.logger = new Logger({level: this.configuration.loggerLevel, filename: this.configuration.loggerFilename});
            this.logger.info('Logger initialized');
            this.logger.info(`Configuration: ${JSON.stringify(this.configuration, null, 2)}`);

            this.dataRepository = new DataSourceMock();
            this.logger.info('Data source initialized');

            this.dataProcessor = new DataProcessorMock();
            this.logger.info('Data processor initialized');

            this.dataWriter = new DataWriterMock();
            this.logger.info('Data writer initialized');

            this.executor = new ExecutorMock();
            this.logger.info('Executor initialized');

            this.logger.info('Application initialized succesfully! Ready to run');
        } catch (e) {
            console.error('Failed to initialize the application', e);
            throw e;
        }
    }

    public run(): void{

    }

}