import { Body, ClassSerializerInterceptor, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, Res, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { createBookDto } from 'src/books/Dtos/createBook.dto';
import { BooksService } from 'src/books/services/books/books.service';

@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService) {}

    @Get('/')
    async getBooks (
       @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
       @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
       ) {
       return  (await this.bookService.getBooks({page,limit})).items.sort((a,_b)=> a.createdAt - 1)
    }

    @Get('/search')
  async  searchBooks(@Query('name') name: string) {
   const books = await this.bookService.searchBooks(name)
   if (books) return books
   throw new HttpException('book not found', HttpStatus.NOT_FOUND)
    }


    @Post()
    @UsePipes(new ValidationPipe())
   async AddBooks(@Req() req: Request, @Res() res: Response) {
   
    const book = await this.bookService.createBook(req,req.body)
    if (book) return res.status(200).json({msg: 'book created', statusCode: HttpStatus.ACCEPTED})
    throw new HttpException('cannot perform action', HttpStatus.BAD_REQUEST)
    }

    @Post(':Id/add-to-save')
    async saveBook(@Req() req: Request, @Param(':Id') id: number) {
        return this.bookService.saveBook(req,id)
    }

    @Patch(':Id')
    async updateBook(
        @Body() data: createBookDto,
        @Param('Id') id: number,
        @Req() req: Request
        ) {
        const book = await this.bookService.update(data,id,req)
        if (book) return book
        throw new HttpException('only author update book', HttpStatus.FORBIDDEN)
    }

    @Delete(':id')
    async RemoveBook(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
        const bookStatus = await this.bookService.deleteBook(req,id)
        if (bookStatus) return res.status(200).json({msg: 'deleted successfully'})
        return res.status(400).json({err: 'bad request', msg: 'only author and Admin can delete book'})
    }

    @Patch(':Id/review')
    async makeReview(
        @Body() data: createBookDto,
        @Param('Id') id: number,
        @Req() req: Request 
    ) {
        
        if (req.decoded) {
            return await this.bookService.makeReview(id,data)
        }
    }
}
