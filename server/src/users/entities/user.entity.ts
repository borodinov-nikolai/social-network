import { ApiProperty } from "@nestjs/swagger"



export class User {
    @ApiProperty()
    login: string
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
}