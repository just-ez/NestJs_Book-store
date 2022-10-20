import { Exclude } from "class-transformer"

export class serailizedUser {
    id: number
    user_name: string
    email: string
    phone_number: string
    

    @Exclude()
    password: string
    constructor (partial: Partial<serailizedUser>) {
        Object.assign(this,partial)
    }
}