import { quoteWithExplicitParameters } from './quoter/quoter'
import { FeeAmount } from '@uniswap/v3-sdk'
import { BigNumberish, ethers} from 'ethers'
import  Quoter  from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'
import { getProvider } from './utilities/configProvider'
import { getQuoterContractAddress } from './utilities/configProvider'
import { toReadableAmount } from './utilities/valueConverters'
import { ConfigurationManager } from './interfaces/configurationManager'
import { DataRepository } from './interfaces/dataRepository'
import { DataWriter } from './interfaces/dataWriter'
import { DataProcessor } from './interfaces/dataProcessor'
import { Executor } from './interfaces/executor'
import { Logger } from './interfaces/logger'


// FeeAmount Enum:
// 0.01% - LOWEST = 100
// 0.05% - LOW = 500
// 0.30% - MEDIUM = 3000

let WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2' // https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
let USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' // https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
let WBTC = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' // https://etherscan.io/token/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599

const quoterContract = new ethers.Contract(
    getQuoterContractAddress(),
    Quoter.abi,
    getProvider()
)

// https://app.uniswap.org/ - Compare Prices
// https://docs.ethers.org/v6/api/utils/#parseUnits



//quoteWithExplicitParameters(quoterContract, WETH, USDC, FeeAmount.LOW, ethers.parseUnits("1",18)).then((value) => {console.log("1 WETH -> USDC: " + toReadableAmount(value,6));})
//quoteWithExplicitParameters(quoterContract, USDC, WETH, FeeAmount.LOW, ethers.parseUnits("1",6)).then((value) => {console.log("1 USDC -> WETH: " + toReadableAmount(value,18));})
//quoteWithExplicitParameters(quoterContract, WETH, WBTC, FeeAmount.LOW, ethers.parseUnits("1",18)).then((value) => {console.log("1 WETH -> WBTC: " + toReadableAmount(value,8));})
//quoteWithExplicitParameters(quoterContract, WBTC, WETH, FeeAmount.LOW, ethers.parseUnits("1",8)).then((value) => {console.log("1 WBTC -> WETH: " + toReadableAmount(value,18));})
//quoteWithExplicitParameters(quoterContract, WBTC, USDC, FeeAmount.MEDIUM, ethers.parseUnits("1",8)).then((value) => {console.log("1 WBTC -> USDC: " + toReadableAmount(value,6));})
//quoteWithExplicitParameters(quoterContract, USDC, WBTC, FeeAmount.MEDIUM, ethers.parseUnits("1",6)).then((value) => {console.log("1 USDC -> WBTC: " + toReadableAmount(value,8));})



async function validateTraingleOpportunity(initialAmount :BigNumberish): Promise<{ initialAmount: BigNumberish; finalResult: string }> {
    let A = await quoteWithExplicitParameters(quoterContract, WETH, USDC, FeeAmount.LOW, ethers.parseUnits(initialAmount.toString(),18));
    let B = await quoteWithExplicitParameters(quoterContract, USDC, WBTC, FeeAmount.MEDIUM, ethers.parseUnits(toReadableAmount(A,6),6))
    let C = await quoteWithExplicitParameters(quoterContract, WBTC, WETH, FeeAmount.LOW, ethers.parseUnits(toReadableAmount(B,8),8))
    const finalResult = toReadableAmount(C, 18);
    return {
        initialAmount: initialAmount,
        finalResult: finalResult
    };
}

async function main(A :BigNumberish, B :BigNumberish){
    const now = new Date().toLocaleTimeString();
    console.log(`TIMESTAMP: ${now}`);
    let aa = await validateTraingleOpportunity(A)
    console.log(`WETH | IN: ${aa.initialAmount} -> OUT: ${aa.finalResult}`);
    let bb = await validateTraingleOpportunity(B)
    console.log(`WETH | IN: ${bb.initialAmount} -> OUT: ${bb.finalResult}`);
}

setInterval(() => {
    main(0.01,1);
}, 2000);


// Add another mode: validate tokens and pools config


//quoteWithExplicitParameters(quoterContract, USDC, WBTC, FeeAmount.MEDIUM, ethers.parseUnits("3557.226629",6)).then((value) => {console.log("3557.226629 USDC -> WBTC: " + toReadableAmount(value,8));})


//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// https://docs.ethers.org/v6/api/utils/#BigNumberish
// https://etherscan.io/
// https://app.infura.io/dashboard/stats
// https://docs.ethers.org/v6/api/providers/jsonrpc/#cid_1116
// https://app.uniswap.org/swap?inputCurrency=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&outputCurrency=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
// https://info.uniswap.org/#/pools
// https://docs.uniswap.org/contracts/v3/reference/deployments
// https://docs.uniswap.org/sdk/v3/guides/swaps/quoting
// https://github.com/Uniswap/v3-periphery/blob/v1.0.0/contracts/lens/Quoter.sol
// https://github.com/Uniswap/v3-periphery/blob/main/deploys.md

class MyApp {
    private readonly configuration: ConfigurationManager;
    private readonly dataRepository: DataRepository;
    private readonly dataProcessor: DataProcessor;
    private readonly dataWriter: DataWriter;
    private readonly executor: Executor;
    private readonly logger: Logger;

    constructor(configuration: ConfigurationManager,
        dataRepository: DataRepository,
        dataProcessor: DataProcessor,
        dataWriter: DataWriter,
        executor: Executor,
        logger: Logger) {
            this.configuration = configuration;
            this.dataRepository = dataRepository;
            this.dataProcessor = dataProcessor;
            this.dataWriter = dataWriter;
            this.executor = executor;
            this.logger = logger;
        }

    public run(): void{
        try {

        } catch (e) {

        }
    }
}