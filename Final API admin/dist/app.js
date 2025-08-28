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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin/admin.controller");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const body_parser_1 = require("body-parser");
const prisma_service_1 = require("./database/prisma.service");
const auth_middleware_1 = require("./common/auth.middleware");
const product_controller_1 = require("./product/product.controller");
let App = class App {
    constructor(logger, adminController, exceptionFilter, configService, prismaService, productController) {
        this.logger = logger;
        this.adminController = adminController;
        this.exceptionFilter = exceptionFilter;
        this.configService = configService;
        this.prismaService = prismaService;
        this.productController = productController;
        this.app = (0, express_1.default)();
        this.port = 8000;
    }
    useRoutes() {
        this.app.use('/admin', this.adminController.router);
        this.app.use('/product', this.productController.router);
    }
    useMiddleware() {
        this.app.use((0, body_parser_1.json)());
        const authMiddleware = new auth_middleware_1.AuthMiddleware(this.configService.get('SECRET'));
        this.app.use(authMiddleware.execute.bind(authMiddleware));
    }
    useExceptionFilter() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.useMiddleware();
            this.useRoutes();
            this.useExceptionFilter();
            yield this.prismaService.connect();
            this.server = this.app.listen(this.port);
            this.logger.info(`Сервер запущен на https://localhost:${this.port} порту`);
        });
    }
};
exports.App = App;
exports.App = App = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IAdminController)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.IExceptionFilter)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.IConfigService)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.PrismaService)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.IProductController)),
    __metadata("design:paramtypes", [Object, admin_controller_1.AdminController, Object, Object, prisma_service_1.PrismaService,
        product_controller_1.ProductController])
], App);
