import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http-error";
import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { IAdminController } from "./admin.controller.interface";
import { AdminRegisterDto } from "./dto/admin.register.dto";
import { AdminLoginDto } from "./dto/admin.login.dto";
import { AdminEntity } from "./admin.entity";
import { IAdminService } from "./admin.service.interface";
import { ValidateMidlleware } from "../common/validate.midlleware";

@injectable()
export class AdminController extends BaseController implements IAdminController {
    constructor(
        @inject(TYPES.ILogger) private loggerService: ILogger,
        @inject(TYPES.IAdminService) private adminService: IAdminService
    ) {
        super(loggerService)
        this.bindRoutes([
            { 
                path: '/login', 
                method: 'post', 
                func: this.login,
                middlewares: [new ValidateMidlleware(AdminLoginDto)] 
            },
            { 
                path: '/register', 
                method: 'post', 
                func: this.register,
                middlewares: [new ValidateMidlleware(AdminRegisterDto)] 
            }
        ])
    }

    login(req: Request<{}, {}, AdminLoginDto>, res: Response, next: NextFunction) {
        const result = this.adminService.validateAdmin(req.body);
        if (!result) {
            return next(new HTTPError(401, 'Ошибка авторизации', 'login'))
        }
        this.ok(res, {});
    }

    async register(
        { body }: Request<{}, {}, AdminRegisterDto>,
         res: Response, next: NextFunction
        ): Promise<void> {
            const result = await this.adminService.createAdmin(body);
            if (!result) {
                return next( new HTTPError(422, 'Такой пользователь уже существует'))
            }
            this.ok(res, { email: result.email, id: result.id });
            this.loggerService.info(`[AdminController] Зарегистрировался пользователь ${body.name} с почтой ${body.email}`)
    }
}