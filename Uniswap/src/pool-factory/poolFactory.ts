import { computePoolAddress } from '@uniswap/v3-sdk'
import  IUniswapV3PoolABI  from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import { ethers } from 'ethers'
import { PoolFactoryConfig } from './poolFactoryConfig.interface'
import { getProvider } from '../utilities/configProvider'

//https://github.com/Uniswap/v3-periphery/blob/main/deploys.md
export const POOL_FACTORY_CONTRACT_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984'

export async function getPoolConstants(config: PoolFactoryConfig): Promise<{
    token0: string
    token1: string
    fee: number
}> {
    const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: config.tokens.in,
    tokenB: config.tokens.out,
    fee: config.tokens.poolFee,
    })

    console.log('pool address: ' + currentPoolAddress);

    // https://docs.ethers.org/v5/api/contract/contract/
    const poolContract = new ethers.Contract(
    currentPoolAddress,
    IUniswapV3PoolABI.abi,
    getProvider()
    )

    const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
    ])

    return {
    token0,
    token1,
    fee,
    }
}