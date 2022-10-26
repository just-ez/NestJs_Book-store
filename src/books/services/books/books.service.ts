import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { createBookDto } from 'src/books/Dtos/createBook.dto';
import { Books } from 'src/Typeorm/book.entities';
import { User } from 'src/Typeorm/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Books) private bookRepository: Repository<Books>, 
    @InjectRepository(User) private userRepository: Repository<User>) {}
  

    async getBooks () {
      return await this.bookRepository.find({
        relations: {
            book_author: true,
            book_pages: true
        },
    })
    }

   async createBook ( req: Request, bookDetails: createBookDto): Promise<Books> {

    const user = await this.userRepository.findOneBy({id: req.decoded.id})
    if (user)  bookDetails.book_author = user
    // console.log(bookDetails);
     const savedBook = await this.bookRepository.save(bookDetails)
     console.log(savedBook);
     return savedBook
     
    }

    async deleteBook(req: Request, res: Response, id: number) {
      const book = await this.bookRepository.findOne({where: {id: id}, relations: {
        book_author: true
      }})
      // if (!book) return res.status(404).send({msg: 'book does not exist'})
      if (book.book_author.id === req.decoded.id) {
        return this.bookRepository.delete({id: id})
      }
      
    }
}
