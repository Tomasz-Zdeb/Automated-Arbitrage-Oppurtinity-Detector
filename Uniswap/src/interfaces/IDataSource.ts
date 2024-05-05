import { BigNumberish, Contract } from 'ethers'

export interface IDataSource {
    getQuote(tokenIn: string,
        tokenOut: string,
        fee: number,
        amount: BigNumberish
    ): Promise<BigNumberish>;
}