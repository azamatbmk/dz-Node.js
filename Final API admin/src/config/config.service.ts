import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";
import { IConfigService } from "./config.service.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";

@injectable()
export class ConfigService implements IConfigService {
    private config: DotenvParseOutput;

    constructor(@inject(TYPES.ILogger) private logger: ILogger) {
        const result: DotenvConfigOutput = config();
        if(result.error) {
            this.logger.error('[ConfigService] Не удалось зпрочитать файл .env или он отсутствует')
        } else {
            this.logger.info('[ConfigService] Конфигурация .env загружена')
            this.config = result.parsed as DotenvParseOutput;
        }
    }

    get(key: string) {
        return this.config[key]
    }
}