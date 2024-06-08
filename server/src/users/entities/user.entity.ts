import { ApiProperty } from "@nestjs/swagger"



export class User {
    id: number
    @ApiProperty()
    login: string
    @ApiProperty()
    email: string
    password: string
    role: "admin" | 'user'
}