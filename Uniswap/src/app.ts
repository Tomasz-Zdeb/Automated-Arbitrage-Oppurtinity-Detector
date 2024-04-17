import { IDataSource } from './interfaces/IDataSource'
import { IDataWriter } from './interfaces/IDataWriter'
import { IDataProcessor } from './interfaces/IDataProcessor'
import { IExecutor } from './interfaces/IExecutor'
import { IManageableLogger } from './interfaces/IManageableLogger'
import { IConfigurationSource } from './interfaces/IConfigurationSource'
import { UserMessages } from './utilities/UserMessages'
import { JsonConfigurationProvider } from './services/JsonConfigurationProvider'
import { DataSourceMock } from './mocks/DataSourceMock'
import { DataProcessorMock } from './mocks/DataProcessorMock'
import { DataWriterMock } from './mocks/DataWriterMock'
import { ExecutorMock } from './mocks/ExecutorMock'
import { DefaultLogger } from './services/DefaultLogger'

export class App {
    private readonly configurationSource: IConfigurationSource;
    private readonly dataRepository: IDataSource;
    private readonly dataProcessor: IDataProcessor;
    private readonly dataWriter: IDataWriter;
    private readonly executor: IExecutor;
    private logger: IManageableLogger;

    private configuration: any;

    public static readonly defaultConfigPath: string = './config.json'

    constructor() {
            this.logger = new DefaultLogger();
            this.configurationSource = new JsonConfigurationProvider(App.defaultConfigPath)
            // Change to Configuration Manager Service once ready to switch to command line parser
            this.dataRepository = new DataSourceMock();
            this.dataProcessor = new DataProcessorMock();
            this.dataWriter = new DataWriterMock();
            this.executor = new ExecutorMock();
        }

    public run(): void{
        try {
            this.logger.log(`${UserMessages.MSG_Separator}`);
            this.logger.log(`${UserMessages.MSG_Startup}`);
            this.logger.log(`${UserMessages.MSG_ConfigLoadAttempt}`);
            this.configuration = this.configurationSource.getConfiguration();
            // get config from config manager
            // if the 

            // engage executor passing, required dependencies
        } catch (e) {
            this.logger.log(` - ${this.constructor.name}: ${UserMessages.MSG_AppLevelUnhandledError}`);
            this.logger.flush()
            this.logger.close()
        }
    }
    //TO-DO
    //Implement logger reinitialization after conifguration fetching
    //Implement injecting app object to it's fields when they are created
    //Continue by implementing getters for the fields so one can pull dependencies to another 
    // E.g. getLogger returns the logger casted to ILogger type
    
}