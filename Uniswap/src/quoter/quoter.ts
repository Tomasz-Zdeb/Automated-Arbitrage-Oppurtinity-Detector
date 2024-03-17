import { BigNumberish, ethers } from 'ethers'
import  Quoter  from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import { getProvider } from '../utilities/configProvider';
import { getPoolConstants } from '../pool-factory/poolFactory'
import { PoolFactoryConfig } from '../pool-factory/poolFactoryConfig.interface'
import { fromReadableAmount, toReadableAmount } from '../utilities/valueConverters';
import { getQuoterContractAddress } from '../utilities/configProvider';


export async function quoteWithConfig(config: PoolFactoryConfig): Promise<string> {
    const quoterContract = new ethers.Contract(
        getQuoterContractAddress(),
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

export async function quoteWithExplicitParameters(quoterContract: ethers.Contract,
    tokenIn: string,
    tokenOut: string,
    fee: number,
    amount: BigNumberish): Promise<BigNumberish> {

    return await quoterContract.quoteExactInputSingle.staticCall(
        tokenIn,
        tokenOut,
        fee,
        amount,
        0
    )
}