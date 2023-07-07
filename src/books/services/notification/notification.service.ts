import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { firebaseConfig } from './firebase-config';

@Injectable()
export class NotificationService {
    constructor() {
       app: firebase.initializeApp(firebaseConfig);
    }

    public async sendAll(){
       const messaging = firebase.messaging()
       firebase
    }
}
