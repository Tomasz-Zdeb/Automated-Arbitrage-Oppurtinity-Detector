import { BigNumberish } from 'ethers';
export interface IDataProcessor {
    detectArbitrageOpportunity(inAmount: BigNumberish, outAmount: BigNumberish): boolean
}