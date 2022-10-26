import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createPageDto } from 'src/pages/Dtos/createPage.dto';
import { Books } from 'src/Typeorm/book.entities';
import { Pages } from 'src/Typeorm/page.entities';
import { User } from 'src/Typeorm/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class PageService {
    constructor(
      @InjectRepository(Pages) private pageRepository: Repository<Pages>,
      @InjectRepository(Books) private userRepository: Repository<Books>
    ){}

  async  createPage ( pageDetails: createPageDto, bookId: number) {
  const book = await this.userRepository.findOneBy({id: bookId})
  console.log(book);
  if (book) {
    pageDetails.book = book
  return this.pageRepository.save(pageDetails)
}
    }
}
