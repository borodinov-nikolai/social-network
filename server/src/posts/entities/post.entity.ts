import { User } from "src/users/entities/user.entity"

export class Post {
    id: number
    title: string
    text: string
    image: string
    user: {
        id: number
        login: string
    }
}
