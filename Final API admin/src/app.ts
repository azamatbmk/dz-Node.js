import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { AdminController } from './admin/admin.controller';

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    adminController: AdminController;

    constructor(
        logger: LoggerService,
        adminController: AdminController
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.adminController = adminController;
    }

    useRoutes() {
        this.app.use('/admin', this.adminController.router)
    }

    init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.info(`Сервер запущен на https://localhost:${this.port} порту`)
    }
}