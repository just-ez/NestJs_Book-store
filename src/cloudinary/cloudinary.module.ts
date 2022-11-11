import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { CloudinaryService } from './cloudinary.service';

@Module({
  // controllers: [],
  providers: [CloudinaryService,CloudinaryController],
  exports: [CloudinaryService,CloudinaryController],
})
export class CloudinaryModule {}
