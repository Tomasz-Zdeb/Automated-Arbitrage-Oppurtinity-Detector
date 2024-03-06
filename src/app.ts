import { Token } from '@uniswap/sdk-core'
import { BigNumber, providers, ethers } from 'ethers'
import { FeeAmount } from '@uniswap/v3-sdk'
import { computePoolAddress } from '@uniswap/v3-sdk'
import  Quoter  from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import  IUniswapV3PoolABI  from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'

import * as tokens from './tokens';

const READABLE_FORM_LEN = 20

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x1F98431c8aD98523631AE4a59f267346ea31F984'
export const QUOTER_CONTRACT_ADDRESS =
  '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6'



export function fromReadableAmount(
  amount: number,
  decimals: number
): BigNumber {
  return ethers.utils.parseUnits(amount.toString(), decimals)
}

export function toReadableAmount(rawAmount: number, decimals: number): string {
  return ethers.utils
    .formatUnits(rawAmount, decimals)
}

export interface AFConfig {
  rpc: {
    mainnet: string
  }
  tokens: {
    in: Token
    amountIn: number
    out: Token
    poolFee: number
  }
}

export const CurrentConfig: AFConfig = {
  rpc: {
    mainnet: 'https://mainnet.infura.io/v3/0ac57a06f2994538829c14745750d721',
  },
  tokens: {
    in: tokens.USDC_TOKEN,
    amountIn: 1,
    out: tokens.WETH_TOKEN,
    poolFee: FeeAmount.LOW,
  },
}

export function getProvider(): providers.Provider {
  return new ethers.providers.JsonRpcProvider(CurrentConfig.rpc.mainnet)
}

export async function getPoolConstants(config: AFConfig): Promise<{
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

export async function quote(config: AFConfig): Promise<string> {
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    Quoter.abi,
    getProvider()
  )
  const poolConstants = await getPoolConstants(config)

  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    poolConstants.token0,
    poolConstants.token1,
    poolConstants.fee,
    fromReadableAmount(
      config.tokens.amountIn,
      config.tokens.in.decimals
    ).toString(),
    0
  )
  console.log(config.tokens.amountIn);
  console.log(config.tokens.in.decimals);
  console.log(config.tokens.out.decimals)
  console.log(quotedAmountOut);
  return toReadableAmount(quotedAmountOut, config.tokens.out.decimals)
}

quote(CurrentConfig).then(console.log).catch(console.error);

// https://docs.ethers.org/v5/api/contract/contract/