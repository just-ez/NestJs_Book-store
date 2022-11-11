import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from 'src/Typeorm/user.entities';
import { Repository } from 'typeorm';
declare module "express-serve-static-core" {
  interface Request {
    decoded?: any;
  }
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor (private jwtService: JwtService, @InjectRepository(User) private userRepository: Repository<User>){}
 async use(req: Request, res: Response, next: NextFunction) {
  
    console.log(req.baseUrl, req.method);

    const token = req.headers.authorization
    if (token) {
      const noBearer = token.replace(/Bearer\s/gi, '')
      const decoded = this.jwtService.verify(noBearer,{ secret: 'jwtConstants.secret'})
      const user = await this.userRepository.findBy({email: decoded.id})
      if (!user) return res.status(400).json({msg: 'invalid Token'})
        req.decoded = decoded
        console.log(req.decoded);
        
     return next()
    
  }
  return res.status(404).json({msg: 'authourization token not found'})
}
}