export class ConfigFileReadError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ConfigFileReadError";
    }
}