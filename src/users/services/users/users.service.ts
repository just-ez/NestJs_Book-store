import { HttpException, HttpStatus, Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Typeorm/user.entities';
import { CreateUserDto } from 'src/users/Dtos/createUser.dto';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Request } from 'express';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService, private cloudinary: CloudinaryService) {}
    
  async  searchUsers (sortBy: string): Promise<User[]> {
    if(sortBy) {
      const searchedUser = await this.userRepository.find({
        relations: { books: true, savedBooks: true},
        where: {user_name: Like(`%${sortBy}%`)}
      })
      return searchedUser
    }
    return await this.userRepository.find({relations: {
      books: true
    }})
    }

    async getUserById (id: number): Promise<User> {
      return await this.userRepository.findOneBy({id: id})
    }
  
   async createUser (userDetails: CreateUserDto) {

   const findEmail = await this.userRepository.findBy({email: userDetails.email})
   const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(userDetails.password, salt) 
    userDetails.password = hashedPass
      if (findEmail.length === 0) return await this.userRepository.save(userDetails)
    
    }

    async DeleteUser (id: number, req: Request) {
      
      if (req.decoded === id) {
        const findUser = await this.userRepository.findOneBy({id: id})
      if (!findUser) return new HttpException('user with id does not exists', HttpStatus.NOT_FOUND)
      return this.userRepository.delete({id: id})
      }

    }

    async login (userDetails: CreateUserDto) {
        const user = await this.userRepository.findOneBy({email: userDetails.email})
        if (user) {
          const checkPass = await bcrypt.compare(userDetails.password, user.password) 
          if (checkPass) {
           const token =  this.jwtService.sign({ id: user.id, email: user.email })
           return {token: token}
          }
          return {err: 'incorrect password',status: HttpStatus.BAD_REQUEST}
        }
        return {err: 'user with email not found', status: HttpStatus.NOT_FOUND}
    }

    async updateUserDeatails(details: CreateUserDto,id: number, req: Request) {
      if (req.decoded.id === id) return this.userRepository.update(id,{
        user_name: details.user_name, 
        bio: details.bio
      })
    } 

    async updateUserProfileimg (file: Express.Multer.File, id: number, req: Request) {
      const imgUrl = await this.cloudinary.uploadImage(file).catch(() => {
        throw new BadRequestException('Invalid file type.');
      });
      return  await this.userRepository.update({id: id},{profileImg: imgUrl.url})
    }

}