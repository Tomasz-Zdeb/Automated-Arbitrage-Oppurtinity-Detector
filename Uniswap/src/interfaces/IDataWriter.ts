import { TraingleAnalysisResult } from "../models/TraingleAnalysisResult";

export interface IDataWriter {
    persist(analysisResult: TraingleAnalysisResult): void
}