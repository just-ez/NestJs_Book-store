import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Books } from "./book.entities";


@Entity()
export class Pages {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @ManyToOne(()=> Books, (book)=> book.book_pages)
    book: Books
    
    @Column({default: false})
    isChapter: boolean
    
    @Column()
    page_number: string

    @Column()
    page_content: string
}