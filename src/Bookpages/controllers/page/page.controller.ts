import {
  Controller,
  Inject,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  HttpException,
  HttpStatus,
  Get,
  Query,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { createPageDto } from 'src/Bookpages/Dtos/createPage.dto';
import { PageService } from 'src/Bookpages/services/page/page.service';

@Controller('page')
export class PageController {
  constructor(private pageService: PageService) {}

  @Get(':bookId')
  async findPage(@Query('page') page: string, @Param() params) {
    const Findpage = await this.pageService.findPage(page, params.bookId);
    if (Findpage) return Findpage;
    throw new HttpException('page not found', HttpStatus.NOT_FOUND);
  }

  @UsePipes(new ValidationPipe())
  @Post('newpage/:bookId')
  async addPage(@Body() pageDto: createPageDto, @Param('') params) {
    const newPage = await this.pageService.createPage(pageDto, params.bookId);
    console.log(newPage);
    if (newPage) return newPage;
    throw new HttpException(
      'No book found you have to create a book to add a page',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Patch('search/:bookId')
  async updatePage(
    @Body() pageDto: createPageDto,
    @Param() params,
    @Query('page') page: string,
  ) {
    const updatePage = await this.pageService.updatePageByPagenumber(
      pageDto,
      page,
      params.bookId,
    );
    if (updatePage) return updatePage;
    throw new HttpException('err', HttpStatus.BAD_REQUEST);
  }

  @Patch(':bookId/:pageId')
  async updatePageById(@Body() pageDto: createPageDto, @Param() params) {
    const updatePage = await this.pageService.updatePageById(
      params.bookId,
      params.pageId,
      pageDto,
    );
    if (updatePage) return { msg: 'page updated', updatePage };
    throw new HttpException('err', HttpStatus.BAD_REQUEST);
  }
}
