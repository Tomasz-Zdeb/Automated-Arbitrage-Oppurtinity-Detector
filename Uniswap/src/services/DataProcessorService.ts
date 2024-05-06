import { IDataProcessor } from '../interfaces/IDataProcessor';
import { BigNumberish } from 'ethers';
import { App } from '../App';
import { ILogger } from '../interfaces/ILogger';

export class DataProcessorService implements IDataProcessor{
    private readonly logger: ILogger;

    constructor(app: App){
        this.logger = app.getLogger();
    }

    detectArbitrageOpportunity(inAmount: BigNumberish, outAmount: BigNumberish): boolean{
        let result = BigInt(inAmount.toString()) < BigInt(outAmount.toString())

        this.logger.debug(`Running DataProcessorService.detectArbitrageOpportunity() method with parameters: inAmount: ${inAmount}, outAmount: ${outAmount} -> result: ${true}`)

        return result;
    }
}