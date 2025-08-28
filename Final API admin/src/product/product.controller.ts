import { inject, injectable } from "inversify";
import { IAdminService } from "../admin/admin.service.interface";
import { AdminLoginDto } from "../admin/dto/admin.login.dto";
import { AdminRegisterDto } from "../admin/dto/admin.register.dto";
import { BaseController } from "../common/base.controller";
import { ValidateMidlleware } from "../common/validate.midlleware";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { NextFunction, Request, Response } from "express";

@injectable()
export class ProductController extends BaseController {
    constructor(
            @inject(TYPES.ILogger) private loggerService: ILogger,
            @inject(TYPES.IAdminService) private adminService: IAdminService,            
        ) {
            super(loggerService)
            this.bindRoutes([
                { 
                    path: '/productInfo', 
                    method: 'get', 
                    func: this.allProductsList,
                    middlewares: [] 
                }
            ])
        }

        async allProductsList(req: Request, res: Response, next: NextFunction) {
                this.loggerService.info('Информация о продукте отправлена')
                this.ok(res, '5845740')
            }
}