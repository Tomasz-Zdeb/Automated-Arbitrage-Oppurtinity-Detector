export class ExecutorError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ExecutorError";
    }
}