import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, Req, Res, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/Dtos/createUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { serailizedUser } from './Serialize/user.serialize';

@Controller('users')
export class UsersController {
    constructor (private userService: UsersService) {}
    @Get()
    getUsers (@Query('page') page: string) {
        console.log(page); 
        return this.userService.getUsers()
    }

    
    @Post('signup')
    @UsePipes(new ValidationPipe())
  async signup(@Body() userDto: CreateUserDto) {
     const user =  await this.userService.createUser(userDto)
     if (user) return {msg: 'user created', redirect: '/login'}
     return new HttpException('user with email already exists', HttpStatus.BAD_REQUEST)
     
    }

    @Post('login')
   async login(@Body() userDto: CreateUserDto)  {
    const user = await this.userService.login(userDto)
    if (user.token) return { msg: 'user signed in', token: user.token }
    if (user.err) throw new HttpException(user.err,user.status)
   }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
   async getuserById (@Param('id', ParseIntPipe) id: number) {
    const user =  await this.userService.getUserById(id)
    console.log(user);
    if (user) return  new serailizedUser(user)
    return new HttpException('user not found', HttpStatus.NOT_FOUND)
    }

    @Delete(':id')
    deleteUser (@Param('id', ParseIntPipe) id: number) {
        return this.userService.DeleteUser(id)
    }
}
