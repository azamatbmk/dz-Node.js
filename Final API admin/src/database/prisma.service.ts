
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { PrismaClient } from "../generated/prisma";

@injectable()
export class PrismaService {
    client: PrismaClient;

    constructor(@inject(TYPES.ILogger) private logger: ILogger,) {
        this.client = new PrismaClient();
    }

    async connect() {
        try {
            await this.client.$connect()
            this.logger.info('[PrismaService] Успешно подключились к базе данных');
        } catch (error) {
            if(error instanceof Error) {
                this.logger.error('[PrismaService] Ошибка подключения к базе данных ' + error.message);
            }
        }
    }

    async disconnect() {
        await this.client.$disconnect()
    }
}