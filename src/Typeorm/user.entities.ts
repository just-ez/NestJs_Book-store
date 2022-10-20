import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_name: string

    @Column()
    email: string

    @Column()
    phone_number: string

    @Column()
    password: string

    @Column({default: false})
    Admin: boolean
}