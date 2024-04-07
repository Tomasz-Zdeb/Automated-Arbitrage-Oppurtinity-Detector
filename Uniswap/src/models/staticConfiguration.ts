import { Token } from './token'

export class StaticConfiguration {
    public readonly jsonRpcProvider: string;
    public readonly quoterContractAddress: string;
    public readonly tokens: Token[]

    constructor(jsonRpcProvider: string,
        quoterContractAdress: string,
        tokens: Token[]
    ){
        this.jsonRpcProvider = jsonRpcProvider;
        this.quoterContractAddress = quoterContractAdress;
        this.tokens = tokens;
    }
}