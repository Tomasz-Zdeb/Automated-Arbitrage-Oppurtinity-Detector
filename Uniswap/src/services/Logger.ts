// Logger.ts
import { ILogger } from '../interfaces/ILogger';
import { ILoggerConfig } from '../interfaces/ILoggerConfig';
import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';

export class Logger implements ILogger {
    private logger: WinstonLogger;

    constructor(config: ILoggerConfig) {
        const date = new Date();
        const timestamp = date.toISOString().replace(/:\d+\.\d+Z$/, '').replace(/:/g, '');
        const filenameWithTimestamp = `${config.filename}-${timestamp}.log`;

        try {
            this.logger = createLogger({
                level: config.level,
                format: format.combine(format.timestamp(), format.json()),
                transports: [
                    new transports.Console({
                        format: format.combine(format.colorize(), format.simple())
                    }),
                    new transports.File({ filename: filenameWithTimestamp })
                ]
            });
        } catch (error) {
            console.error('Failed to initialize logger, please check your config! Error: ', error);
            throw error;
        }
    }

    log(level: string, message: string, meta?: any): void {
        this.logger.log(level, message, meta);
    }

    error(message: string, meta?: any): void {
        this.logger.error(message, meta);
    }

    warn(message: string, meta?: any): void {
        this.logger.warn(message, meta);
    }

    info(message: string, meta?: any): void {
        this.logger.info(message, meta);
    }

    debug(message: string, meta?: any): void {
        this.logger.debug(message, meta);
    }
}
