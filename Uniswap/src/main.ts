import { JsonConfigurationProvider } from './services/JsonConfigurationProvider'
import { IConfigurationSource } from './interfaces/IConfigurationSource'
import { ConfigurationManagerService } from './services/ConfigurationManagerService'
import { App } from './App'

let app = new App();



















// FeeAmount Enum:
// 0.01% - LOWEST = 100
// 0.05% - LOW = 500
// 0.30% - MEDIUM = 3000

// let WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
// let USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
// let WBTC = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'

// const quoterContract = new ethers.Contract(
//     getQuoterContractAddress(),
//     Quoter.abi,
//     getProvider()
// )

// async function validateTraingleOpportunity(initialAmount :BigNumberish): Promise<{ initialAmount: BigNumberish; finalResult: string }> {
//     let A = await quoteWithExplicitParameters(quoterContract, WETH, USDC, FeeAmount.LOW, ethers.parseUnits(initialAmount.toString(),18));
//     let B = await quoteWithExplicitParameters(quoterContract, USDC, WBTC, FeeAmount.MEDIUM, ethers.parseUnits(ValueConverter.toReadableAmount(A,6),6))
//     let C = await quoteWithExplicitParameters(quoterContract, WBTC, WETH, FeeAmount.LOW, ethers.parseUnits(ValueConverter.toReadableAmount(B,8),8))
//     const finalResult = ValueConverter.toReadableAmount(C, 18);
//     return {
//         initialAmount: initialAmount,
//         finalResult: finalResult
//     };
// }

// async function main(A :BigNumberish, B :BigNumberish){
//     const now = new Date().toLocaleTimeString();
//     console.log(`TIMESTAMP: ${now}`);
//     let aa = await validateTraingleOpportunity(A)
//     console.log(`WETH | IN: ${aa.initialAmount} -> OUT: ${aa.finalResult}`);
//     let bb = await validateTraingleOpportunity(B)
//     console.log(`WETH | IN: ${bb.initialAmount} -> OUT: ${bb.finalResult}`);
// }

// setInterval(() => {
//     main(0.01,1);
// }, 2000);