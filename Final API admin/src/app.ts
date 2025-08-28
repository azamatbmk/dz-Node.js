import express, { Express } from 'express';
import { Server } from 'http';
import { AdminController } from './admin/admin.controller';
import { inject, injectable } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { json } from 'body-parser';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';
import { ProductController } from './product/product.controller';

@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.IAdminController) private adminController: AdminController,
        @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
        @inject(TYPES.IConfigService) private configService: IConfigService,
        @inject(TYPES.PrismaService) private prismaService: PrismaService,
        @inject(TYPES.IProductController) private productController: ProductController,
    ) {
        this.app = express();
        this.port = 8000;
    }

    useRoutes() {
        this.app.use('/admin', this.adminController.router)
        this.app.use('/product', this.productController.router)
    }

    useMiddleware() {
        this.app.use(json())
        const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'))
        this.app.use(authMiddleware.execute.bind(authMiddleware))
    }

    useExceptionFilter() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    async init() {
        this.useMiddleware();
        this.useRoutes();
        this.useExceptionFilter();
        await this.prismaService.connect();
        this.server = this.app.listen(this.port);
        this.logger.info(`Сервер запущен на https://localhost:${this.port} порту`)
    }
}