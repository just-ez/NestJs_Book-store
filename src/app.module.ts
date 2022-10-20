import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { User } from './Typeorm/user.entities';
import { UsersModule } from './users/users.module';

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
    entities: [User],
    synchronize: true
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
