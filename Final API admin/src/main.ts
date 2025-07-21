import { AdminController } from "./admin/admin.controller";
import { App } from "./app";
import { LoggerService } from "./logger/logger.service";

function bootstrap() {
    const logger = new LoggerService();
    const app = new App(logger, new AdminController(logger));
    app.init()
    
}

bootstrap()