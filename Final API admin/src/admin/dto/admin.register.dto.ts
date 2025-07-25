import { IsEmail, IsString } from "class-validator";

export class AdminRegisterDto {
    @IsEmail({}, { message: 'Не верно указан email' })
    email: string;

    @IsString({ message: 'Не верно указан пароль' })
    password: string;

    @IsString({ message: 'Не верно указано имя' })
    name: string;
}