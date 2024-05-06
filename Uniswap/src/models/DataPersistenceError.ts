export class DataPersistenceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DataPersistenceError";
    }
}