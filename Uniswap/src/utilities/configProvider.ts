import { JsonRpcProvider, ethers } from 'ethers'
import { PoolFactoryConfig } from '../pool-factory/poolFactoryConfig.interface'
import * as tokens from './tokens';
import { FeeAmount } from '@uniswap/v3-sdk'

export function getProvider(): JsonRpcProvider {
    return new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/f22b8853c0994ce4a1da79604a4cd56f')
}

export function getPoolFactoryConfig(): PoolFactoryConfig {
    return {
        tokens: {
          in: tokens.WETH_TOKEN,
          amountIn: 1,
          out: tokens.USDC_TOKEN,
          poolFee: FeeAmount.LOW,
        },
    }
} 