import { IExecutor } from '../interfaces/IExecutor';
import { App } from '../App';
import { ILogger } from '../interfaces/ILogger';
import { Config } from '../models/Config';
import { IDataSource } from '../interfaces/IDataSource';
import { IDataProcessor } from '../interfaces/IDataProcessor';
import { IDataWriter } from '../interfaces/IDataWriter';
import { Fee } from '../enums/Fee';
import { ethers } from 'ethers';

export class ExecutorService implements IExecutor {
    private readonly logger: ILogger;
    private readonly config: Config;
    private readonly dataSource: IDataSource;
    private readonly dataProcessor: IDataProcessor;
    private readonly dataWritter: IDataWriter;

    constructor(app: App){
        this.logger = app.getLogger();
        this.config = app.getConfiguration();
        this.dataSource = app.getDataSource();
        this.dataProcessor = app.getDataProcessor();
        this.dataWritter = app.getDataWritter();
    }

    public async run(): Promise<void> {
        //Example fetch of 1 ETH
        let a = await this.dataSource.getQuote(this.config.tokenConfigs[0].address,
            this.config.tokenConfigs[1].address,
            Number(Fee[this.config.tokenConfigs[0].fee]),
            ethers.parseUnits(this.config.tokenBaseAmount.toString(),this.config.tokenConfigs[0].decimals))
        this.logger.warn(` A ===========> ${a}`);
    }
}