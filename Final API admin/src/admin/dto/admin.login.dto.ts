import { IsEmail, IsString } from "class-validator";

export class AdminLoginDto {
    @IsEmail({}, { message: 'Не верно указан email' })
    email: string;

    @IsString({ message: 'Не верно указано имя' })
    password: string;
}