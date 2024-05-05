export class ConfigParseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ConfigParseError";
    }
}