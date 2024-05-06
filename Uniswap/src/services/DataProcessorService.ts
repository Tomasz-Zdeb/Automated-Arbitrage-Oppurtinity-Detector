import { IDataProcessor } from '../interfaces/IDataProcessor';
import { BigNumberish } from 'ethers';
import { App } from '../App';
import { ILogger } from '../interfaces/ILogger';

export class DataProcessorService implements IDataProcessor{
    private readonly logger: ILogger;

    constructor(app: App){
        this.logger = app.getLogger();
    }

    detectArbitrageOpportunity(inAmount: bigint, outAmount: bigint): boolean{
        let result = inAmount < outAmount

        this.logger.debug(`Running DataProcessorService.detectArbitrageOpportunity() method with parameters: inAmount: ${inAmount}, outAmount: ${outAmount} -> result: ${result}`)

        return result;
    }
}
