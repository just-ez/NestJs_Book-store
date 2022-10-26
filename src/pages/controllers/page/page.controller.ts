import { Controller, Inject, Post, Body, UsePipes, ValidationPipe, Param, HttpException, HttpStatus } from '@nestjs/common';
import { createPageDto } from 'src/pages/Dtos/createPage.dto';
import { PageService } from 'src/pages/services/page/page.service';

@Controller('page')
export class PageController {
    constructor(private pageService: PageService){}

    @UsePipes(new ValidationPipe())
    @Post('/newpage/:bookId')
    async postPage (@Body() pageDto: createPageDto, @Param('') params) {
        const newPage = await this.pageService.createPage(pageDto, params.bookId)
        console.log(newPage);
        if (newPage) return newPage
        throw new HttpException('No book found you have to create a book to add page', HttpStatus.BAD_REQUEST)

    }
}
