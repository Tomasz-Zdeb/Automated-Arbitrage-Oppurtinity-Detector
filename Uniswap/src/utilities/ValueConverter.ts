import { BigNumberish, ethers } from 'ethers'

export class ValueConverter{
    public static fromReadableAmount(
        amount: number,
        decimals: number ): BigNumberish {
        return ethers.parseUnits(amount.toString(), decimals)
    }

    public static toReadableAmount(rawAmount: BigNumberish, decimals: number): string {
        return ethers.formatUnits(rawAmount, decimals)
    }
}