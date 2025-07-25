"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.appContainer = exports.app = void 0;
const inversify_1 = require("inversify");
const admin_controller_1 = require("./admin/admin.controller");
const app_1 = require("./app");
const exception_filter_1 = require("./errors/exception.filter");
const logger_service_1 = require("./logger/logger.service");
const types_1 = require("./types");
const admin_service_1 = require("./admin/admin.service");
const appContainerModule = new inversify_1.ContainerModule((options) => {
    options.bind(types_1.TYPES.ILogger).to(logger_service_1.LoggerService);
    options.bind(types_1.TYPES.IExceptionFilter).to(exception_filter_1.ExceptionFilter);
    options.bind(types_1.TYPES.IAdminController).to(admin_controller_1.AdminController);
    options.bind(types_1.TYPES.Application).to(app_1.App);
    options.bind(types_1.TYPES.IAdminService).to(admin_service_1.AdminService);
});
function bootstrap() {
    const appContainer = new inversify_1.Container();
    appContainer.load(appContainerModule);
    const app = appContainer.get(types_1.TYPES.Application);
    app.init();
    return { app, appContainer };
}
_a = bootstrap(), exports.app = _a.app, exports.appContainer = _a.appContainer;
