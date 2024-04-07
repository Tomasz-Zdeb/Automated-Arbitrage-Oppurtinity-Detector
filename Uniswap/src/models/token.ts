import { ChainId } from '@uniswap/sdk-core'

export class Token {
    readonly chainId: ChainId;
    readonly address: string;
    readonly decimals: number;
    readonly symbol: string;
    readonly name: string;
    readonly explorerLink?: string;
  
    constructor(
      chainId: ChainId,
      address: string,
      decimals: number,
      symbol: string,
      name: string,
      explorerLink?: string
    ) {
      this.chainId = chainId;
      this.address = address;
      this.decimals = decimals;
      this.symbol = symbol;
      this.name = name;
      this.explorerLink = explorerLink;
    }
  
    getExplorerLink(): string {
      return this.explorerLink ?? `https://etherscan.io/address/[chainID]`;
    }
  }
  