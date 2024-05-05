import { IDataSource } from '../interfaces/IDataSource'
import { BigNumberish, ethers } from 'ethers'
import  Quoter  from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import { ValueConverter } from '../utilities/ValueConverter';
import { ILogger } from '../interfaces/ILogger';
import { App } from '../App';

export class UniswapDataFetchService implements IDataSource {
    private readonly logger: ILogger;
    private readonly quoterContract;

    constructor(app: App){
        let config = app.getConfiguration();

        this.logger = app.getLogger();
        this.quoterContract = new ethers.Contract(
                config.quoterContractAddress,
                Quoter.abi,
                new ethers.JsonRpcProvider(config.jsonRpcProvider)
        )
    }

    async getQuote (tokenIn: string,
        tokenOut: string,
        fee: number,
        amount: BigNumberish): Promise<BigNumberish> {
        
        this.logger.debug(`Running UniswapDataFetchService.getQuote() method with parameters: tokenIn:${tokenIn}, tokenOut:${tokenOut}, fee:${fee}, amount:${amount}`);

        return await this.quoterContract.quoteExactInputSingle.staticCall(
            tokenIn,
            tokenOut,
            fee,
            amount,
            0
        )
    }
}