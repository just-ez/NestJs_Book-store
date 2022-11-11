import { IsNotEmpty, IsNumberString, IsString, IsUrl } from "class-validator";
import { Books } from "src/Typeorm/book.entities";
import { Pages } from "src/Typeorm/page.entities";
import { User } from "src/Typeorm/user.entities";
import { DeepPartial } from "typeorm";

export class createBookDto {
    @IsNotEmpty()
    @IsString()
    book_name: string

    // @IsUrl()
    @IsNotEmpty()
    book_cover: string

    book_author: DeepPartial<User>

    book_pages: DeepPartial<Pages[]>

    @IsNumberString()
    reviews: string
    
    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    geners: string
}