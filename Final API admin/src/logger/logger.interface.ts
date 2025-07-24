import { ILogObj, Logger } from 'tslog';

export interface ILogger {
    logger: Logger<ILogObj>;

    info(...args: unknown[]): void;

    error(...args: unknown[]): void;

    warn(...args: unknown[]): void;
}