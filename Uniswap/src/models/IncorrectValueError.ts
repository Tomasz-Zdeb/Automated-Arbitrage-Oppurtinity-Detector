export class IncorrectValueError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "IncorrectValueError";
    }
}