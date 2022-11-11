import { Controller } from '@nestjs/common';
import { v2 } from 'cloudinary'
import {CLOUDINARY} from './constants'
export const CloudinaryController = {

    provide: CLOUDINARY,
    useFactory: () => {
        return v2.config({
            cloud_name: 'eos-tech',
      api_key: '641824977648761',
      api_secret: '3-czwZ4QV5Rth6X8bivODTst8Lg'
        })
    }
}
