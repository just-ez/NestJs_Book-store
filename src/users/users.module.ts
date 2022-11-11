import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/Typeorm/user.entities';
import { UsersController } from './controllers/users/users.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UsersService } from './services/users/users.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),  JwtModule.register({
    secret: 'jwtConstants.secret',
    signOptions: { expiresIn: '7days' }
}), CloudinaryModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude(
      {path: 'users/signup', method: RequestMethod.POST},
      {path: 'users/login', method: RequestMethod.POST}
      ).forRoutes('users')
  }
}
