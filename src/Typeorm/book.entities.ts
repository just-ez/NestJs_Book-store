import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pages } from "./page.entities";
import { User } from "./user.entities";

@Entity()
export class Books {

    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    book_name: string

    @Column()
    book_cover: string

    @ManyToOne(() => User, (user)=> user.books)
    book_author: User

    @OneToMany(()=> Pages, (page) => page.book)
    book_pages: Pages[]

    @Column()
    description: string

    @Column()
    geners: string

}