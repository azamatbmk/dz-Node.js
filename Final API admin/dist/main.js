"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controller_1 = require("./admin/admin.controller");
const app_1 = require("./app");
const exception_filter_1 = require("./errors/exception.filter");
const logger_service_1 = require("./logger/logger.service");
function bootstrap() {
    const logger = new logger_service_1.LoggerService();
    const app = new app_1.App(logger, new admin_controller_1.AdminController(logger), new exception_filter_1.ExceptionFilter(logger));
    app.init();
}
bootstrap();
