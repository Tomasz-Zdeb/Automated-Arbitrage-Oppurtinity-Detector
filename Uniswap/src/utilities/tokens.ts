import { ChainId, Token } from '@uniswap/sdk-core'

// https://docs.uniswap.org/sdk/core/reference/classes/Token#decimals

export const WETH_TOKEN = new Token(
  ChainId.MAINNET,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
  // https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
)

export const USDC_TOKEN = new Token(
  ChainId.MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USDC'
  // https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
)

export const WBTC_TOKEN = new Token(
  ChainId.MAINNET,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC'
  // https://etherscan.io/address/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599
)