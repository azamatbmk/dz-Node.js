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
exports.AdminService = void 0;
const inversify_1 = require("inversify");
const admin_entity_1 = require("./admin.entity");
const types_1 = require("../types");
const jsonwebtoken_1 = require("jsonwebtoken");
let AdminService = class AdminService {
    constructor(configService, adminRepository) {
        this.configService = configService;
        this.adminRepository = adminRepository;
    }
    createAdmin(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, name, password }) {
            const newAdmin = new admin_entity_1.AdminEntity(email, name);
            yield newAdmin.setPassword(password, Number(this.configService.get('SALT')));
            const existedAdmin = yield this.adminRepository.find(email);
            if (existedAdmin) {
                return null;
            }
            return this.adminRepository.create(newAdmin);
        });
    }
    validateAdmin(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const existedAdmin = yield this.adminRepository.find(email);
            if (!existedAdmin) {
                return false;
            }
            if (typeof existedAdmin.name === 'string') {
                const newAdmin = new admin_entity_1.AdminEntity(existedAdmin.email, existedAdmin.name, existedAdmin.password);
                return newAdmin.comparePassword(password);
            }
            else {
                return false;
            }
        });
    }
    ;
    signJWT(dto, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                (0, jsonwebtoken_1.sign)({
                    email: dto.email,
                    iat: Math.floor(Date.now() / 1000)
                }, secret, {
                    algorithm: 'HS256'
                }, (err, token) => {
                    if (err) {
                        reject(err);
                    }
                    return resolve(token);
                });
            });
        });
    }
    ;
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.IConfigService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.IAdminRepository)),
    __metadata("design:paramtypes", [Object, Object])
], AdminService);
