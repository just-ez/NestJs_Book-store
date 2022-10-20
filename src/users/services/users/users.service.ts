import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Typeorm/user.entities';
import { CreateUserDto } from 'src/users/Dtos/createUser.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) {}
    
  async  getUsers (): Promise<User[]> {
    return this.userRepository.find()
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

    async DeleteUser (id: number) {
      const findUser = await this.userRepository.findBy({id: id})
      if (findUser.length === 0) return new HttpException('user with id does not exists', HttpStatus.NOT_FOUND)
      return this.userRepository.delete({id: id})
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
}
