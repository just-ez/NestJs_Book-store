import { Controller, Get } from '@nestjs/common';

@Controller('books')
export class BooksController {
    @Get()
    getBooks(): object {
    return {
        Book_name: 'be happy',
        author: 'jack harlie',
        description: 'a book for you to be happy'
    }
    }
}
