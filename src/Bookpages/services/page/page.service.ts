import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createPageDto } from 'src/Bookpages/Dtos/createPage.dto';
import { Books } from 'src/Typeorm/book.entities';
import { Pages } from 'src/Typeorm/page.entities';
import { User } from 'src/Typeorm/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class PageService {
    constructor(
      @InjectRepository(Pages) private pageRepository: Repository<Pages>,
      @InjectRepository(Books) private bookRepository: Repository<Books>
    ){}

    async findPage (page: string, bookId: number) {
      
      const book = await this.bookRepository.find({relations: {
        book_pages: true
      }})
      const pageBook = book.find((book)=> book.id === bookId)
      console.log(pageBook);
      
      if (pageBook) {
        const findPage = pageBook.book_pages.find((book)=> book.page_number === page)
        if( findPage ) return findPage
      }
    }

  async  createPage ( pageDetails: createPageDto, bookId: number) {
  const book = await this.bookRepository.findOneBy({id: bookId})
  console.log(book);
  if (book) {
    pageDetails.book = book
  return this.pageRepository.save(pageDetails)
}
    }

    async updatePageByPagenumber (data: createPageDto, page: string, bookId: number) {
      const book = await this.bookRepository.find({relations: {
        book_pages: true
      }})
      const pageBook = book.find((book)=> book.id === bookId)
      console.log(pageBook);
      
      if (pageBook) {
        const findPage = pageBook.book_pages.find((book)=> book.page_number === page)
        if( findPage ) {
          console.log(page);
          return this.pageRepository.update({page_number: findPage.page_number}, data)
          
        }
      }
    }

    async updatePageById (bookId: number, pageId: number, data: createPageDto) {
      const book = await this.bookRepository.find({relations: {
        book_pages: true
      },
    where: {id: bookId}})
    console.log(book);
    
      if (book) {
      const page =  book.find(books => books.book_pages.find(page => page.id === pageId))
      console.log(page);
      if (page) {
        return this.pageRepository.update({id: page.id},data)
      }
      }
    }
}
