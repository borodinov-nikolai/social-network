import { IsEmail, IsNotEmpty, MinLength } from "class-validator"



export class SignUpDto {
    @IsNotEmpty({message: 'Это поле обязательно'})
    login: string
    @IsNotEmpty({message: 'Это поле обязательно'})
    @IsEmail({}, {message: 'Введите корректный email'})
    email: string
    @IsNotEmpty({message: 'Это поле обязательно'})
    @MinLength(5, {message: 'Длина пароля должна быть не менее 5 символов'})
    password: string
}