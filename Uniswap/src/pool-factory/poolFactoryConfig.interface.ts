import { Token } from '@uniswap/sdk-core'

export interface PoolFactoryConfig {
    tokens: {
        in: Token
        amountIn: number
        out: Token
        poolFee: number //https://en.wikipedia.org/wiki/Basis_point
    }
}