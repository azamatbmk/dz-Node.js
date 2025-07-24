import { AdminEntity } from "./admin.entity";
import { AdminLoginDto } from "./dto/admin.login.dto";
import { AdminRegisterDto } from "./dto/admin.register.dto";

export interface IAdminService {
    createAdmin: (dto: AdminRegisterDto) => Promise<AdminEntity | null>;
    validateAdmin: (dto: AdminLoginDto) => boolean;
}