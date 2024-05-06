import { IExecutor } from '../interfaces/IExecutor';
import { App } from '../App';
import { ILogger } from '../interfaces/ILogger';
import { Config } from '../models/Config';
import { IDataSource } from '../interfaces/IDataSource';
import { IDataProcessor } from '../interfaces/IDataProcessor';
import { IDataWriter } from '../interfaces/IDataWriter';
import { Fee } from '../enums/Fee';
import { ethers } from 'ethers';
import { ExecutorError } from '../models/ExecutorError';
import { ValueConverter } from '../utilities/ValueConverter';
import { TraingleAnalysisResult } from '../models/TraingleAnalysisResult';
import { SwapDetails } from '../models/SwapDetails';

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
        try {
            let timestamp = new Date().toISOString();
            let baseAmount = ethers.parseUnits(this.config.tokenBaseAmount.toString(),this.config.tokenConfigs[0].decimals);
            let baseAmountReadable = ValueConverter.toReadableAmount(baseAmount,this.config.tokenConfigs[0].decimals);

            let a = await this.dataSource.getQuote(this.config.tokenConfigs[0].address,
                this.config.tokenConfigs[1].address,
                Number(Fee[this.config.tokenConfigs[0].fee]),
                baseAmount);
            let aReadable = ValueConverter.toReadableAmount(a,this.config.tokenConfigs[1].decimals);

            let b = await this.dataSource.getQuote(this.config.tokenConfigs[1].address,
                this.config.tokenConfigs[2].address,
                Number(Fee[this.config.tokenConfigs[1].fee]),
                ethers.parseUnits(aReadable.toString(),this.config.tokenConfigs[1].decimals)
            );
            let bReadable = ValueConverter.toReadableAmount(b,this.config.tokenConfigs[2].decimals);

            let c = await this.dataSource.getQuote(this.config.tokenConfigs[2].address,
                this.config.tokenConfigs[0].address,
                Number(Fee[this.config.tokenConfigs[2].fee]),
                ethers.parseUnits(bReadable.toString(),this.config.tokenConfigs[2].decimals)
            );
            let cReadable = ValueConverter.toReadableAmount(c,this.config.tokenConfigs[0].decimals);
            
            let opportunity = this.dataProcessor.detectArbitrageOpportunity(baseAmount,BigInt(c));

            const analysisResult = new TraingleAnalysisResult(
                new SwapDetails(baseAmount.toString(), baseAmountReadable, this.config.tokenConfigs[0].symbol),
                new SwapDetails(a.toString(), aReadable, this.config.tokenConfigs[1].symbol),
                new SwapDetails(b.toString(), bReadable, this.config.tokenConfigs[2].symbol),
                new SwapDetails(c.toString(), cReadable, this.config.tokenConfigs[0].symbol),
                opportunity,
                timestamp
            )

            this.dataWritter.persist(analysisResult)
            
            this.logger.debug(`ExecutorService.run() with parameters ${baseAmountReadable} ${this.config.tokenConfigs[0].symbol} -> ${aReadable} ${this.config.tokenConfigs[1].symbol} -> ${bReadable} ${this.config.tokenConfigs[2].symbol} -> ${cReadable} ${this.config.tokenConfigs[0].symbol} isOpportunity: ${opportunity}`);
        } catch (e)
        {
            throw new ExecutorError(`ExecutorService.run() Error: ${e}`)
        }
    }
}