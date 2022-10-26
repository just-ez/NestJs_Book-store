import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { createBookDto } from 'src/books/Dtos/createBook.dto';
import { BooksService } from 'src/books/services/books/books.service';

@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService) {}
    @Get()
  async  getBooks() {
   const books = await this.bookService.getBooks()
   if (books) return books
   throw new HttpException('something happened try again', HttpStatus.BAD_GATEWAY)
    }

    @Post()
   async AddBooks(@Body() bookDto: createBookDto, @Req() req: Request, @Res() res: Response) {
    const book = await this.bookService.createBook(req,bookDto)
    console.log(book);
    
    if (book) return res.status(200).json({msg: 'book created', statusCode: HttpStatus.ACCEPTED})
    throw new HttpException('cannot perform action', HttpStatus.BAD_REQUEST)
    }

    @Delete(':id')
    async RemoveBook(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
        const bookStatus = await this.bookService.deleteBook(req,res,id)
        if (bookStatus) return res.status(200).json({msg: 'deleted successfully'})
        return res.status(400).json({err: 'bad request', msg: 'only author and Admin can delete book'})
    }
}
