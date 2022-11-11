import { IsEmail, isNotEmpty, IsNotEmpty, IsNumberString, Min, MinLength } from "class-validator"
import { Books } from "src/Typeorm/book.entities"
import { User } from "src/Typeorm/user.entities"
import { DeepPartial } from "typeorm"

export class CreateUserDto {

    @IsNotEmpty()
    user_name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    // @IsNumberString()
    phone_number: string

    @IsNotEmpty()
    bio: string

    @IsNotEmpty()
    @MinLength(6)
    password: string

    books: DeepPartial<Books[]>

    // @IsNotEmpty()
    isVerified: boolean
}