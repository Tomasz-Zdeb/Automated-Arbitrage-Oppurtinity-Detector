import { ILogger } from './ILogger'
import { LogDestination } from "../enums/LogDestination";

export interface IManageableLogger extends ILogger {
    flush(): Promise<void>;
    close(): void;
    getLogDestination(): LogDestination;
}