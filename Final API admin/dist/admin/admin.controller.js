"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const base_controller_1 = require("../common/base.controller");
const http_error_1 = require("../errors/http-error");
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const admin_register_dto_1 = require("./dto/admin.register.dto");
const validate_midlleware_1 = require("../common/validate.midlleware");
let AdminController = class AdminController extends base_controller_1.BaseController {
    constructor(loggerService, adminService) {
        super(loggerService);
        this.loggerService = loggerService;
        this.adminService = adminService;
        this.bindRoutes([
            {
                path: '/login',
                method: 'post',
                func: this.login,
            },
            {
                path: '/register',
                method: 'post',
                func: this.register,
                middlewares: [new validate_midlleware_1.ValidateMidlleware(admin_register_dto_1.AdminRegisterDto)]
            }
        ]);
    }
    login(req, res, next) {
        console.log(req.body);
        next(new http_error_1.HTTPError(401, 'Ошибка авторизации', 'login'));
    }
    register(_a, res_1, next_1) {
        return __awaiter(this, arguments, void 0, function* ({ body }, res, next) {
            const result = yield this.adminService.createAdmin(body);
            this.ok(res, result);
            this.loggerService.info(`[AdminController] Зарегистрировался пользователь ${body.name} с почтой ${body.email}`);
        });
    }
};
exports.AdminController = AdminController;
exports.AdminController = AdminController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IAdminService)),
    __metadata("design:paramtypes", [Object, Object])
], AdminController);
