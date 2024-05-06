import { IncorrectValueError } from "./IncorrectValueError";

export class SwapDetails {
    private readonly amount: string;
    private readonly amountReadable: string;
    private readonly symbol: string;

    constructor(amount: string, amountReadable: string, symbol: string) {

        if (!amount || !amountReadable || !symbol) {
            throw new IncorrectValueError("All properties must hava a valid parameter provided");
        }

        this.amount = amount;
        this.amountReadable = amountReadable;
        this.symbol = symbol;
    }

    getAmount(): string {
        return this.amount;
    }

    getAmountReadable(): string {
        return this.amountReadable;
    }

    getSymbol(): string {
        return this.symbol;
    }
}