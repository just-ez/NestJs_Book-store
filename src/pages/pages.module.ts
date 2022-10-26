import { Module } from '@nestjs/common';
import { PageService } from './services/page/page.service';
import { PageController } from './controllers/page/page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pages } from 'src/Typeorm/page.entities';
import { User } from 'src/Typeorm/user.entities';
import { Books } from 'src/Typeorm/book.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Pages, Books])],
  providers: [PageService],
  controllers: [PageController]
})
export class PagesModule {}
