import { IDataWriter } from '../interfaces/IDataWriter';
import { TraingleAnalysisResult } from '../models/TraingleAnalysisResult';
import { ILogger } from '../interfaces/ILogger';
import { App } from '../App';
import * as fs from 'fs';
import * as path from 'path';
import { DataPersistenceError } from '../models/DataPersistenceError';

export class DataPersistenceService implements IDataWriter{
    private readonly logger: ILogger;
    private dataFilePath: string;

    constructor(app: App){
        this.logger = app.getLogger();
        this.dataFilePath =  process.cwd();
    }

    persist(analysisResult: TraingleAnalysisResult): void{
        try {
            this.appendOrCreateFile(JSON.stringify(analysisResult))
        } catch (e) {
            if (e instanceof DataPersistenceError){
                throw e
            } else {
                throw new DataPersistenceError(`DataPersistenceService error: ${e}`)
            }
                
        }
    }

    private appendOrCreateFile(data: string): void {
        const date = new Date();
        const dateString = date.toISOString().substring(0, 10);
        const filename = `${dateString}.data`;
        const filePath = path.join(this.dataFilePath, filename);

        fs.open(filePath, 'a', (e, fd) => {
            if (e) {
                throw new DataPersistenceError(`DataPersistenceService faced error during opening/createing the file, Error: ${e}`)
            }

            fs.appendFile(fd, data + '\n', (e) => {
                if (e) {
                    throw new DataPersistenceError(`DataPersistenceService faced error during writing data to the file, Error: ${e}`)
                } else {
                    this.logger.debug('Data appended or file created successfully.');
                }
                fs.close(fd, (e) => {
                    if (e) {
                        throw new DataPersistenceError(`DataPersistenceService faced error during closing the file, Error: ${e}`)
                    } else
                    {
                        this.logger.debug(`data succesfully written to the file. Filename: ${filename}, data: ${data}`)
                    }
                });
            });
        });
    }
}