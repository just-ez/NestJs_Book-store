import { Exclude } from "class-transformer"

export class serializeBook {
    book_name: string
    book_cover: string
    book_pages: string
    description: string
    geners: string 
     @Exclude()
    book_author: {
      id: string
      user_name:string
      email: string
      phone_number: string
     Admin: false 
      password: string
    }
    constructor (partial: Partial<serializeBook>){
        Object.assign(this,partial)
     }
}