import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from 'src/Typeorm/book.entities';
import { Pages } from 'src/Typeorm/page.entities';
import { User } from 'src/Typeorm/user.entities';
import { BooksController } from './controllers/books/books.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { BooksService } from './services/books/books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Books, User, Pages]), JwtModule.register({
    secret: 'jwtConstants.secret',
    signOptions: { expiresIn: '7days' }
})],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule  implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({path: 'books', method: RequestMethod.POST})
  }
}
