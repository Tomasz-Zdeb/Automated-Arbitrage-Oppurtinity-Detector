import { BigNumberish, ethers } from 'ethers'
import  Quoter  from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import { getProvider } from '../utilities/configProvider';
import { getPoolConstants } from '../pool-factory/poolFactory'
import { PoolFactoryConfig } from '../pool-factory/poolFactoryConfig.interface'
import { fromReadableAmount, toReadableAmount } from '../utilities/valueConverters';

export const QUOTER_CONTRACT_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'
//https://github.com/Uniswap/v3-periphery/blob/v1.0.0/contracts/lens/Quoter.sol

export async function quoteWithConfig(config: PoolFactoryConfig): Promise<string> {
    const quoterContract = new ethers.Contract(
        QUOTER_CONTRACT_ADDRESS,
        Quoter.abi,
        getProvider()
    )
    const poolConstants = await getPoolConstants(config)

    const quotedAmountOut = await quoterContract.quoteExactInputSingle.staticCall(
        poolConstants.token0,
        poolConstants.token1,
        poolConstants.fee,
        fromReadableAmount(config.tokens.amountIn, config.tokens.in.decimals).toString(),
        0
    )

    return toReadableAmount(quotedAmountOut, config.tokens.out.decimals)
}

export async function quoteWithExplicitPars(quoterContract: ethers.Contract,
    tokenIn: string,
    tokenOut: string,
    fee: number,
    amount: BigNumberish): Promise<string> {

    return await quoterContract.quoteExactInputSingle.staticCall(
        tokenIn,
        tokenOut,
        fee,
        amount,
        0
    )
}