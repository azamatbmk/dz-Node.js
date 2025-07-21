import { ILogObj, Logger } from 'tslog';

export class LoggerService {
    public logger: Logger<ILogObj>;

    constructor() {
        this.logger = new Logger({
            prettyLogTemplate: '{{dateIsoStr}}\t{{logLevelName}}\t'
        })
    }

    info(...args: unknown[]) {
        this.logger.info(...args)
    }

    error(...args: unknown[]) {
        this.logger.error(...args)
    }

    warn(...args: unknown[]) {
        this.logger.warn(...args)
    }
}