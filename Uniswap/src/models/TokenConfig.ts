import { ChainId } from '@uniswap/sdk-core'
import { Fee } from '../enums/Fee';
import { ConfigParseError } from './ConfigParseError';

export class TokenConfig {
    readonly chainId: ChainId;
    readonly address: string;
    readonly decimals: number;
    readonly symbol: string;
    readonly name: string;
    readonly fee: Fee;
    readonly explorerLink?: string;
  
    constructor(
      chainId: ChainId,
      address: string,
      decimals: number,
      symbol: string,
      name: string,
      fee: Fee, 
      explorerLink?: string
    ) {
      if (chainId === undefined) throw new ConfigParseError("Failed to parse the configuration - tokens (chainId) configuration missing or it's incorrect");
      if (!address) throw new ConfigParseError("Failed to parse the configuration - tokens (address) configuration missing or it's incorrect");
      if (decimals === undefined || decimals < 0) throw new ConfigParseError("Failed to parse the configuration - tokens (decimals) configuration missing or it's incorrect");
      if (!symbol) throw new ConfigParseError("Failed to parse the configuration - tokens (symbol) configuration missing or it's incorrect");
      if (!name) throw new ConfigParseError("Failed to parse the configuration - tokens (name) configuration missing or it's incorrect");
      if (fee === undefined) throw new ConfigParseError("Failed to parse the configuration - tokens (fee) configuration missing or it's incorrect");

      this.chainId = chainId;
      this.address = address;
      this.decimals = decimals;
      this.symbol = symbol;
      this.name = name;
      this.fee = fee;
      this.explorerLink = explorerLink;
    }
  
    getExplorerLink(): string {
      return this.explorerLink ?? `https://etherscan.io/address/[chainID]`;
    }
  }
  