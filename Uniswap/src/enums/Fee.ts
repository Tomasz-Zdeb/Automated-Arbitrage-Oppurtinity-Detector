// Overwrites uniswap sdk amount to allow only realistic fees based on existing pools: https://docs.uniswap.org/sdk/v3/reference/enums/FeeAmount

export enum Fee {
    LOWEST = 100,
    LOW = 500,
    MEDIUM = 3000
}