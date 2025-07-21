import { AdminController } from "./admin/admin.controller";
import { App } from "./app";
import { ExceptionFilter } from "./errors/exception.filter";
import { LoggerService } from "./logger/logger.service";

function bootstrap() {
    const logger = new LoggerService();
    const app = new App(logger, new AdminController(logger), new ExceptionFilter(logger));
    app.init()
    
}

bootstrap()