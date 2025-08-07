import { inject, injectable } from "inversify";
import { AdminEntity } from "./admin.entity";
import { IAdminService } from "./admin.service.interface";
import { AdminRegisterDto } from "./dto/admin.register.dto";
import { AdminLoginDto } from "./dto/admin.login.dto";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";
import { IAdminRepository } from "./admin.repository.interface";
import { AdminModel } from "../generated/prisma";

@injectable()
export class AdminService implements IAdminService {

    constructor(
        @inject(TYPES.IConfigService) private configService: IConfigService,
        @inject(TYPES.IAdminRepository) private adminRepository: IAdminRepository
    ) {
    }
    
    async createAdmin({ email, name, password }: AdminRegisterDto): Promise<AdminModel | null> {
        const newAdmin = new AdminEntity(email,name);
        await newAdmin.setPassword(password, Number(this.configService.get('SALT')))
        const existedAdmin = await this.adminRepository.find(email)
        if (existedAdmin) {
            return null
        }
        return this.adminRepository.create(newAdmin)
    }

    async validateAdmin({ email, password }: AdminLoginDto) {
        const existedAdmin = await this.adminRepository.find(email);
        if (!existedAdmin) {
            return false;
        }
        if (existedAdmin.name === 'string') {
            const newAdmin = new AdminEntity(existedAdmin.email, existedAdmin.name, existedAdmin.password);
            return newAdmin.comparePassword(password)
        } else {
            return false
        }
    };
}