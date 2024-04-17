// Logger.ts
import { LogDestination } from "../enums/LogDestination";
import * as fs from 'fs';
import * as path from 'path';
import { ILogger } from "../interfaces/ILogger";
import { UserMessages } from "../utilities/UserMessages";

export class DefaultLogger implements ILogger{
    private buffer: string[] = [];
    private logFilePath: string;
    private destination: LogDestination;
    private writeStream?: fs.WriteStream;

    constructor(destination?: LogDestination) {
        this.destination = destination || LogDestination.Console;
        const today = new Date().toISOString().slice(0, 10);
        const logDirectory = path.join(process.cwd(), "logs");

        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory);
        }

        this.logFilePath = path.join(logDirectory, `${today}.log`);

        if (this.destination === LogDestination.File || this.destination === LogDestination.ConsoleAndFile) {
            this.writeStream = fs.createWriteStream(this.logFilePath, {
                flags: 'a',
                encoding: 'utf-8'
            });
        }
        this.log(`- ${this.constructor.name}: ${UserMessages.MSG_LoggerInitialized} ${process.cwd()}`);
        this.flush();
    }

    log(message: string): void {
        const timestamp = new Date().toISOString();
        const formattedMessage = `[${timestamp}] ${message}`;
        this.buffer.push(formattedMessage);
    }

    async flush(): Promise<void> {
        if (this.buffer.length === 0) {
            return;
        }

        const logData = this.buffer.join('\n') + '\n';
        this.buffer = [];

        if (this.destination === LogDestination.Console || this.destination === LogDestination.ConsoleAndFile) {
            console.log(logData);
        }

        if (this.destination === LogDestination.File || this.destination === LogDestination.ConsoleAndFile) {
            this.writeStream?.write(logData);
        }
    }

    close(): void {
        this.writeStream?.end();
    }

    getLogDestination(): LogDestination {
        return this.destination;
    }
}
