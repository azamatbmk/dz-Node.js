import express, { Express } from 'express';
import { Server } from 'http';
import { AdminController } from './admin/admin.controller';
import { inject, injectable } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { json } from 'body-parser';

@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.IAdminController) private adminController: AdminController,
        @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter
    ) {
        this.app = express();
        this.port = 8000;
    }

    useRoutes() {
        this.app.use('/admin', this.adminController.router)
    }

    useMiddleware() {
        this.app.use(json())
    }

    useExceptionFilter() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    init() {
        this.useMiddleware();
        this.useRoutes();
        this.useExceptionFilter();
        this.server = this.app.listen(this.port);
        this.logger.info(`Сервер запущен на https://localhost:${this.port} порту`)
    }
}