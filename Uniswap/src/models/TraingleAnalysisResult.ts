import { SwapDetails } from "./SwapDetails";
import { IncorrectValueError } from "./IncorrectValueError";

export class TraingleAnalysisResult {
    private readonly base: SwapDetails;
    private readonly firstSwap: SwapDetails;
    private readonly secondSwap: SwapDetails;
    private readonly thirdSwap: SwapDetails;
    private readonly isOpportunity: boolean;
    private readonly timestamp: string;

    constructor(
        base: SwapDetails,
        firstSwap: SwapDetails,
        secondSwap: SwapDetails,
        thirdSwap: SwapDetails,
        isOpportunity: boolean,
        timestamp: string
    ) {
        this.base = base;
        this.firstSwap = firstSwap;
        this.secondSwap = secondSwap;
        this.thirdSwap = thirdSwap;
        this.isOpportunity = isOpportunity;
        this.timestamp = timestamp;

        if (!this.base || !this.firstSwap || !this.secondSwap || !this.thirdSwap || !this.timestamp) {
            throw new IncorrectValueError("All swap details must be provided");
        }
    }

    getBase(): SwapDetails {
        return this.base;
    }

    getFirstSwap(): SwapDetails {
        return this.firstSwap;
    }

    getSecondSwap(): SwapDetails {
        return this.secondSwap;
    }

    getThirdSwap(): SwapDetails {
        return this.thirdSwap;
    }

    getIsOpportunity(): boolean {
        return this.isOpportunity;
    }

    getTimestamp(): string {
        return this.timestamp;
    }
}