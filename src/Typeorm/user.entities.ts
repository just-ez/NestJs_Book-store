import { createBookDto } from "src/books/Dtos/createBook.dto";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Books } from "./book.entities";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    user_name: string

    @Column()
    email: string

    @Column()
    phone_number: string

    @Column()
    password: string

    @Column({default: ''})
    bio: string

   @OneToMany(() => Books, (books)=> books.book_author)
    books: Books[]

   @ManyToMany(() => Books)
   @JoinTable()
   savedBooks: Books[]

    @Column({default: ''})
    profileImg: string

    @Column({default: false})
    isVerified: boolean

    @Column({default: false})
    isGoogleSigned: boolean
  user: Books;
}