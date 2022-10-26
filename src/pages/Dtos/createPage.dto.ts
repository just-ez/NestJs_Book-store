import { IsBoolean, IsNotEmpty, IsNumberString, MaxLength } from "class-validator";
import { Books } from "src/Typeorm/book.entities";
import { DeepPartial } from "typeorm";

export class createPageDto {

   
    book: DeepPartial<Books>
    
    @IsNotEmpty()
    @IsBoolean()
    isChapter: boolean

    @IsNotEmpty()
    @IsNumberString()
    page_number: string

    @IsNotEmpty()
    @MaxLength(400)
    page_content: string
}