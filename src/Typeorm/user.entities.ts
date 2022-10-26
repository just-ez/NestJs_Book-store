import { createBookDto } from "src/books/Dtos/createBook.dto";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
   @OneToMany(() => Books, (books)=> books.book_author)
    books: Books[]

    @Column({default: false})
    Admin: boolean
}