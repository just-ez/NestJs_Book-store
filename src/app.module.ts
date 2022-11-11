import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Books } from './Typeorm/book.entities';
import { Pages } from './Typeorm/page.entities';
import { User } from './Typeorm/user.entities';
import { UsersModule } from './users/users.module';
import { PagesModule } from './pages/pages.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { Cloudinary } from './cloudinary';

@Module({
  imports: [
    BooksModule, 
    UsersModule,  
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'Big-Ez',
    password: 'Ezra112',
    database: 'book_store',
    entities: [User, Books, Pages],
    synchronize: true
  }), PagesModule, CloudinaryModule],
  controllers: [],
  providers: [Cloudinary],
})
export class AppModule {}
