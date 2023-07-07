import { IsNotEmpty, IsNumberString, IsString, IsUrl } from "class-validator";
import { Books } from "src/Typeorm/book.entities";
import { DeepPartial } from "typeorm";

export class createBookDto {
    @IsNotEmpty()
    @IsString()
    book_name: string

    // @IsUrl()
    @IsNotEmpty()
    book: DeepPartial<Books>

    @IsNumberString()
    discussion: []
}