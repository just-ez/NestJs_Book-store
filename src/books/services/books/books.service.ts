import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { createBookDto } from 'src/books/Dtos/createBook.dto';
import { Books } from 'src/Typeorm/book.entities';
import { User } from 'src/Typeorm/user.entities';
import { LessThanOrEqual, Like, Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Books) private bookRepository: Repository<Books>, 
    @InjectRepository(User) private userRepository: Repository<User>) {}
  
    async getBooks (options: IPaginationOptions) {
      return paginate<Books>(this.bookRepository, options)
    }

    async searchBooks (query: string) {
      const book = await this.bookRepository.find({
        relations: {
            book_author: true,
            book_pages: true
        },
        where: [{book_name: Like(`%${query}%`)}]
    })
    if (book.length > 0) return book
    }


   async createBook ( req: Request, bookDetails: createBookDto): Promise<Books> {

    const user = await this.userRepository.findOneBy({id: req.decoded.id})
    if (user)  bookDetails.book_author = user
    // console.log(bookDetails);
     const savedBook = await this.bookRepository.save(bookDetails)
     console.log(savedBook);
     return savedBook
    }

    async saveBook(req: Request, id: number) {
      const book = await this.bookRepository.findBy({id: id})
      const user = await this.userRepository.findOneBy({id: req.decoded.id})
      if (user) {
        user.savedBooks = book
     return   this.userRepository.save(user)
      }

    }

    async update(data: createBookDto,id: number, req: Request) {
      const book = await this.bookRepository.findOne({where: {id: id}, relations: {
        book_author: true
      }})
      if (book.book_author.id === req.decoded.id) {
        return this.bookRepository.update({id: id}, {
          book_name: data.book_name,
          book_cover: data.book_cover,
          geners: data.geners,
          description: data.description
        })
      }
    }

    async deleteBook(req: Request,id: number) {
      const book = await this.bookRepository.findOne({where: {id: id}, relations: {
        book_author: true
      }})
      if (book.book_author.id === req.decoded.id) {
        return this.bookRepository.delete({id: id})
      }
    }
    
}
