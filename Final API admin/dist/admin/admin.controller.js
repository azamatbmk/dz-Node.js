"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const base_controller_1 = require("../common/base.controller");
const http_error_1 = require("../errors/http-error");
class AdminController extends base_controller_1.BaseController {
    constructor(logger) {
        super(logger);
        this.bindRoutes([
            { path: '/login', method: 'post', func: this.login },
            { path: '/register', method: 'post', func: this.register }
        ]);
    }
    login(req, res, next) {
        next(new http_error_1.HTTPError(401, 'Ошибка авторизации', 'login'));
    }
    register(req, res, next) {
        this.ok(res, 'register');
    }
}
exports.AdminController = AdminController;
