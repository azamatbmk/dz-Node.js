import { Container, ContainerModule, ContainerModuleLoadOptions} from "inversify";
import { AdminController } from "./admin/admin.controller";
import { App } from "./app";
import { ExceptionFilter } from "./errors/exception.filter";
import { LoggerService } from "./logger/logger.service";
import { ILogger } from "./logger/logger.interface";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import { TYPES } from "./types";
import { IAdminController } from "./admin/admin.controller.interface";
import { IAdminService } from "./admin/admin.service.interface";
import { AdminService } from "./admin/admin.service";

const appContainerModule = new ContainerModule((options: ContainerModuleLoadOptions) => {
    options.bind<ILogger>(TYPES.ILogger).to(LoggerService);
    options.bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
    options.bind<IAdminController>(TYPES.IAdminController).to(AdminController);
    options.bind<App>(TYPES.Application).to(App);
    options.bind<IAdminService>(TYPES.IAdminService).to(AdminService);
});

function bootstrap() {
    const appContainer = new Container();
    appContainer.load(appContainerModule);
    const app = appContainer.get<App>(TYPES.Application);
    app.init()
    return { app, appContainer };
}


export const { app, appContainer } = bootstrap();