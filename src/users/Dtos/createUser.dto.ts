import { IsEmail, isNotEmpty, IsNotEmpty, IsNumberString, Min, MinLength } from "class-validator"

export class CreateUserDto {

    @IsNotEmpty()
    user_name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNumberString()
    phone_number: string

    @IsNotEmpty()
    @MinLength(6)
    password: string

    @IsNotEmpty()
    Admin: boolean
}