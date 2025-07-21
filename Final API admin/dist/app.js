"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
class App {
    constructor(logger, adminController, exceptionFilter) {
        this.app = (0, express_1.default)();
        this.port = 8000;
        this.logger = logger;
        this.adminController = adminController;
        this.exceptionFilter = exceptionFilter;
    }
    useRoutes() {
        this.app.use('/admin', this.adminController.router);
    }
    useExceptionFilter() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }
    init() {
        this.useRoutes();
        this.useExceptionFilter();
        this.server = this.app.listen(this.port);
        this.logger.info(`Сервер запущен на https://localhost:${this.port} порту`);
    }
}
exports.App = App;
