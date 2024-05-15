# Automated Arbitrage Opportunity Detector

A Node.js application written in typescript with the purpose of detecting triangular arbitrage opportunities on Uniswap v3. AAOD was written using Node.js version 20.11.x.

## Run Instruction

As for now there is no packaging solution provided for the project, so no single runnable artifact is produced. Therefore in order to run the application, make sure that there are three main components in the working directory:

* `dist` - project's compiled code
* `node_modules` - project's dependencies
* `config.json` - application configuration file

once all of mentioned are present, application can be run using command: `node dist/main.js`.

### Linux background run

In case one would like to start the application on a remote linux machine and make it keep running after SSH session is ended, please execute following instructions.

1. Run `nohup node dist/main.js > /dev/null 2>&1 &` This command will run the process in the background and prevent any console output to be displayed, which otherwise would be displayed since the process is not yet fully detached from the SSH process.
2. Run `disown %n` where `%n` is your job number, which can be checked using `jobs` command.
## Configuration

Currently confiugration mechanism supports only configuration via config file.

### File: config.json

#### Fields

- `loggerLever` - Sets level of displayed logs severity, available values from lowest to highest: `debug`,`info`,`warn`,`error` - 
- `loggerFilename` - Name of the log file. there will be timestamp appended at the end of it, e.g. for value `AAOD-log` the actual filename will be: `AAOD-log-2024-05-15T1509`
- `jsonRpcProvider` - URL of the Rpc endpoint, e.g. Infura's or other provider's endpoint
- `quoterContractAddress` - Ethereum blockchain adress of the quoter contract - data source
- `tokens` - List of three tokens to monitor. Order of the swaps is based on the order in config file
- `schedulerConfig` - Setup of the execution schedule, defined in cron like syntax
- `schedulerTimeout` - Timeout interval for each triangle analysis
- `tokenBaseAmount` - Amount of base token that is quoted by the application

#### Example

```json
{
    "loggerLevel":"debug",
    "loggerFilename":"AAOF-log",
    "jsonRpcProvider": "https://mainnet.infura.io/v3/2713d8e9a60f411fb06ed5eaddcde617",
    "quoterContractAddress": "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
    "tokens": [
        {
          "chainId": "MAINNET",
          "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          "decimals": 18,
          "symbol": "WETH",
          "name": "Wrapped Ether",
          "explorerLink": "https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
          "fee": "LOW"
        },
        {
          "chainId": "MAINNET",
          "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          "decimals": 6,
          "symbol": "USDC",
          "name": "USDC",
          "explorerLink": "https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "fee": "LOW"
        },
        {
          "chainId": "MAINNET",
          "address": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
          "decimals": 8,
          "symbol": "WBTC",
          "name": "Wrapped BTC",
          "explorerLink": "https://etherscan.io/address/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
          "fee": "LOW"
        }
      ],
    "schedulerConfig":"*/10 * * * * *",
    "schedulerTimeout":"5000",
    "tokenBaseAmount":"0.1"
}
```

## Output

Despite creating log file in the process working directory, a data file will be created named after the date and containing `.data` extension. Each line of the file consists of a JSON object that represents given tokens triangle analysis

## Related Resources

- https://docs.ethers.org/v6/api/utils/#BigNumberish
- https://etherscan.io/
- https://app.infura.io/dashboard/stats
- https://docs.ethers.org/v6/api/providers/jsonrpc/#cid_1116
- https://app.uniswap.org/swap?inputCurrency=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&outputCurrency=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
- https://info.uniswap.org/#/pools
- https://docs.uniswap.org/contracts/v3/reference/deployments
- https://docs.uniswap.org/sdk/v3/guides/swaps/quoting
- https://github.com/Uniswap/v3-periphery/blob/v1.0.0/contracts/lens/Quoter.sol
- https://github.com/Uniswap/v3-periphery/blob/main/deploys.md
- https://app.uniswap.org/
- https://docs.ethers.org/v6/api/utils/#parseUnits