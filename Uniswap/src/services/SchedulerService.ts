import { IExecutor } from '../interfaces/IExecutor';
import { App } from '../App';
import { ILogger } from '../interfaces/ILogger';
import cron from 'node-cron';
import { ScheduledTask } from 'node-cron';
import { Config } from '../models/Config';
import { IScheduler } from '../interfaces/IScheduler'


export class SchedulerService implements IScheduler {
    private readonly logger: ILogger;
    private readonly timezone: string;
    private tasks: ScheduledTask[];
    private config: Config;

    constructor(app:App, timezone: string = "UTC") {
        this.logger = app.getLogger();
        this.timezone = timezone;
        this.tasks = [];
        this.config = app.getConfiguration();
    }

    public addJob(action: () => Promise<void>): void {


        const wrappedAction = async () => {
            let timeoutHandle: NodeJS.Timeout | null = null;
      
            const timeoutPromise = new Promise((_, reject) => {
              timeoutHandle = setTimeout(() => {
                reject(this.logger.error(`Task timeout (${this.config.schedulerTimeout}ms) reached, stopping the task`));
              }, this.config.schedulerTimeout);
            });
      
            try {
              await Promise.race([action(), timeoutPromise]);
            } catch (error) {
                this.logger.error('Error occured during task execution:', error);
            } finally {
                if (timeoutHandle) {
                    clearTimeout(timeoutHandle);
                }
            }
          };


        const task = cron.schedule(this.config.schedulerConfig, wrappedAction, {
          scheduled: true,
          timezone: this.timezone
        });
        this.tasks.push(task);
        this.logger.debug(`Cron job added and scheduled to run at: ${this.config.schedulerConfig} with timeout ${this.config.schedulerTimeout}ms, timezone set to: ${this.timezone}`);
    }

    public startAllJobs(): void {
        this.logger.debug("Scheduler starting jobs");
        this.tasks.forEach(task => task.start());
        this.logger.info('All scheduler jobs started');
    }
    
    public stopAllJobs(): void {
        this.logger.debug("Scheduler stopping jobs");
        this.tasks.forEach(task => task.stop());
        this.logger.info('All scheduler jobs stopped');
    }
}