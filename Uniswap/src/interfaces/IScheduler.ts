export interface IScheduler {
    addJob(action: () => Promise<void>): void
    startAllJobs(): void
    stopAllJobs(): void
}