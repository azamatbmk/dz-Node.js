import { AdminModel } from "../generated/prisma";
import { AdminEntity } from "./admin.entity";
import { AdminLoginDto } from "./dto/admin.login.dto";
import { AdminRegisterDto } from "./dto/admin.register.dto";

export interface IAdminService {
    createAdmin: (dto: AdminRegisterDto) => Promise<AdminModel | null>;
    validateAdmin: (dto: AdminLoginDto) => Promise<boolean>;
    signJWT: (dto: AdminLoginDto, secret: string) => Promise<string>;
}