import { ApiProperty } from "@nestjs/swagger";



export class Message {
    @ApiProperty()
    id: number
    @ApiProperty()
    read: boolean
    @ApiProperty()
    content: string
    @ApiProperty()
    senderId: number
    @ApiProperty()
    receiverId: number
    @ApiProperty()
    timestamp: Date
}