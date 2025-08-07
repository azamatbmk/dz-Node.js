import { inject, injectable } from "inversify";
import { AdminModel } from "../generated/prisma";
import { IAdminRepository } from "./admin.repository.interface";
import { TYPES } from "../types";
import { AdminEntity } from "./admin.entity";
import { PrismaService } from "../database/prisma.service";

@injectable()
export class AdminRepository implements IAdminRepository{

    constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

    async create({ email, password, name }: AdminEntity): Promise<AdminModel> {
        return this.prismaService.client.adminModel.create({
            data: {
                email,
                password,
                name
            }
        })
    }

    async find(email: string): Promise<AdminModel | null> {
        return this.prismaService.client.adminModel.findFirst({
            where: {
                email
            }
        })
    }
}