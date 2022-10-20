import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.baseUrl,'-', req.method, '-', new Date().toLocaleDateString()+', '+new Date().toLocaleTimeString());
    
    next();
  }
}
