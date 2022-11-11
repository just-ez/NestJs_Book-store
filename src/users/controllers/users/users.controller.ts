import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/Dtos/createUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { serailizedUser } from './Serialize/user.serialize';

@Controller('users')
export class UsersController {
    constructor (private userService: UsersService) {}
    @UseInterceptors(ClassSerializerInterceptor)

    @Get('search')
   async getUsers (@Query('sortBy') sortBy: string) {
        const users = await this.userService.searchUsers(sortBy)
        if (users.length > 0) return users.map(user => new serailizedUser(user))
        throw new HttpException('user not found', HttpStatus.NOT_FOUND)
    }
    
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
   async getuserById (@Param('id', ParseIntPipe) id: number) {
    const user =  await this.userService.getUserById(id)
    console.log(user);
    if (user) return  new serailizedUser(user)
    return new HttpException('user not found', HttpStatus.NOT_FOUND)
    }

    @Post('/profileimage')
    async updateUserProfileimg(@Body() image: CreateUserDto) {
        
    }

    @Post('signup')
    @UsePipes(new ValidationPipe())
  async signup(@Body() userDto: CreateUserDto) {
     const user =  await this.userService.createUser(userDto)
     if (user) return {msg: 'Account created, click on login route to login',  statusCode: 200}
     return new HttpException('user with email already exists', HttpStatus.BAD_REQUEST)
    }

    @Post('login')
   async login(@Body() userDto: CreateUserDto)  {
    const user = await this.userService.login(userDto)
    if (user.token) return { msg: 'user signed in', token: user.token }
    if (user.err) throw new HttpException(user.err,user.status)
   }

   @Patch(':Id/update-user-profile')
   async updateUserProfile(
    @Body() details: CreateUserDto, 
    @Param('Id') id: number, 
    @Req() req: Request) 
    {
      const update = await this.userService.updateUserDeatails(details,id,req)
      if (update) return update
      throw new HttpException('cannot perform action', HttpStatus.SERVICE_UNAVAILABLE)
   }

   @Patch(':Id/upload-profile-image')
   @UseInterceptors(FileInterceptor('img'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Param('Id') id: number, @Req() req: Request) {
   
     if (req.decoded.id === id) {
      const res = await this.userService.updateUserProfileimg(file,id,req);
     if (res) return res
     throw new HttpException('invalid user id', HttpStatus.BAD_REQUEST)
     }
    throw new HttpException('you cannot perform action', HttpStatus.SERVICE_UNAVAILABLE)
   }
 

    @Delete(':id')
   async deleteUser (@Param('id') id: number, @Req() req: Request) {
     const deleteUser = await this.userService.DeleteUser(id, req)
      if (deleteUser) return deleteUser
      throw new HttpException('you cannot perform this action', HttpStatus.SERVICE_UNAVAILABLE) 
    }

    
}
