import { AdminModel } from "../generated/prisma";
import { AdminEntity } from "./admin.entity";

export interface IAdminRepository {
    create: (admin: AdminEntity) => Promise<AdminModel>;
    find: (email: string) => Promise<AdminModel | null>;
}