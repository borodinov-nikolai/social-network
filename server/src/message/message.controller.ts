import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { MessagesService } from "./message.service";
import { Message } from "./entities/message.entity";





@Controller('/messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService ){}

    @Get()
    getMessages(@Query() query: {senderId: string, receiverId?: string}):Promise<Message[]> {
        return this.messagesService.findMany(query)
    }
    
    @Get('/unread-count/:userId')
    getUnreadMessagesCount(@Param('userId') userId: string) {
     
            return this.messagesService.getUnreadCount(userId)
    }
    @Post('/make-read')
    makeRead(@Body() body: {userId: number, contactId:number}) {
         this.messagesService.makeRead(body)
    }
}