import { inject, injectable } from "inversify";
import { AdminEntity } from "./admin.entity";
import { IAdminService } from "./admin.service.interface";
import { AdminRegisterDto } from "./dto/admin.register.dto";
import { AdminLoginDto } from "./dto/admin.login.dto";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";

@injectable()
export class AdminService implements IAdminService {

    constructor(@inject(TYPES.IConfigService) private configService: IConfigService,) {
    }
    
    async createAdmin({ email, name, password}: AdminRegisterDto) {
        const newAdmin = new AdminEntity(email,name);
        await newAdmin.setPassword(password, Number(this.configService.get('SALT')))
        return newAdmin;
    }

    validateAdmin(dto: AdminLoginDto) {
        return true;
    };
}