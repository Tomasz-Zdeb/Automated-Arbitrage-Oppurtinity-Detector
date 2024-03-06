"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quote = exports.getPoolConstants = exports.getProvider = exports.CurrentConfig = exports.toReadableAmount = exports.fromReadableAmount = exports.QUOTER_CONTRACT_ADDRESS = exports.POOL_FACTORY_CONTRACT_ADDRESS = void 0;
const ethers_1 = require("ethers");
const v3_sdk_1 = require("@uniswap/v3-sdk");
const v3_sdk_2 = require("@uniswap/v3-sdk");
const Quoter_json_1 = __importDefault(require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json"));
const IUniswapV3Pool_json_1 = __importDefault(require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json"));
const tokens = __importStar(require("./tokens"));
const READABLE_FORM_LEN = 20;
exports.POOL_FACTORY_CONTRACT_ADDRESS = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
exports.QUOTER_CONTRACT_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';
function fromReadableAmount(amount, decimals) {
    return ethers_1.ethers.utils.parseUnits(amount.toString(), decimals);
}
exports.fromReadableAmount = fromReadableAmount;
function toReadableAmount(rawAmount, decimals) {
    return ethers_1.ethers.utils
        .formatUnits(rawAmount, decimals);
}
exports.toReadableAmount = toReadableAmount;
exports.CurrentConfig = {
    rpc: {
        mainnet: 'https://mainnet.infura.io/v3/0ac57a06f2994538829c14745750d721',
    },
    tokens: {
        in: tokens.USDC_TOKEN,
        amountIn: 1,
        out: tokens.WETH_TOKEN,
        poolFee: v3_sdk_1.FeeAmount.LOW,
    },
};
function getProvider() {
    return new ethers_1.ethers.providers.JsonRpcProvider(exports.CurrentConfig.rpc.mainnet);
}
exports.getProvider = getProvider;
async function getPoolConstants(config) {
    const currentPoolAddress = (0, v3_sdk_2.computePoolAddress)({
        factoryAddress: exports.POOL_FACTORY_CONTRACT_ADDRESS,
        tokenA: config.tokens.in,
        tokenB: config.tokens.out,
        fee: config.tokens.poolFee,
    });
    const poolContract = new ethers_1.ethers.Contract(currentPoolAddress, IUniswapV3Pool_json_1.default.abi, getProvider());
    const [token0, token1, fee] = await Promise.all([
        poolContract.token0(),
        poolContract.token1(),
        poolContract.fee(),
    ]);
    return {
        token0,
        token1,
        fee,
    };
}
exports.getPoolConstants = getPoolConstants;
// DODAĆ CONFIG JAKO PARAMETR
async function quote(config) {
    const quoterContract = new ethers_1.ethers.Contract(exports.QUOTER_CONTRACT_ADDRESS, Quoter_json_1.default.abi, getProvider());
    const poolConstants = await getPoolConstants(config);
    const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(poolConstants.token0, poolConstants.token1, poolConstants.fee, fromReadableAmount(config.tokens.amountIn, config.tokens.in.decimals).toString(), 0);
    console.log(config.tokens.amountIn);
    console.log(config.tokens.in.decimals);
    console.log(config.tokens.out.decimals);
    console.log(quotedAmountOut);
    return toReadableAmount(quotedAmountOut, config.tokens.out.decimals);
}
exports.quote = quote;
quote(exports.CurrentConfig).then(console.log).catch(console.error);
