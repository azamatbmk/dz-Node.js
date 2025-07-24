import { injectable } from "inversify";
import { AdminEntity } from "./admin.entity";
import { IAdminService } from "./admin.service.interface";
import { AdminRegisterDto } from "./dto/admin.register.dto";
import { AdminLoginDto } from "./dto/admin.login.dto";

@injectable()
export class AdminService implements IAdminService {

    async createAdmin({ email, name, password}: AdminRegisterDto) {
        const newAdmin = new AdminEntity(email,name);
        await newAdmin.setPassword(password)
        return newAdmin;
    }

    validateAdmin(dto: AdminLoginDto) {
        return true;
    };
}