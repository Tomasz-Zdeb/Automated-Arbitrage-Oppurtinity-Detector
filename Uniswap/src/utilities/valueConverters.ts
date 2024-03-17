import { BigNumberish, ethers } from 'ethers'

export function fromReadableAmount(
    amount: number,
    decimals: number
): BigNumberish {
    return ethers.parseUnits(amount.toString(), decimals)
}

export function toReadableAmount(rawAmount: BigNumberish, decimals: number): string {
    return ethers.formatUnits(rawAmount, decimals)
}