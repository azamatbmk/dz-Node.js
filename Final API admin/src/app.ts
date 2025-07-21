import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { AdminController } from './admin/admin.controller';
import { ExceptionFilter } from './errors/exception.filter';

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    adminController: AdminController;
    exceptionFilter: ExceptionFilter;

    constructor(
        logger: LoggerService,
        adminController: AdminController,
        exceptionFilter: ExceptionFilter
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.adminController = adminController;
        this.exceptionFilter = exceptionFilter;
    }

    useRoutes() {
        this.app.use('/admin', this.adminController.router)
    }

    useExceptionFilter() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    init() {
        this.useRoutes();
        this.useExceptionFilter();
        this.server = this.app.listen(this.port);
        this.logger.info(`Сервер запущен на https://localhost:${this.port} порту`)
    }
}