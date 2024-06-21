import { Controller, Get, Param } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}


  @Get('/messages/:userId')
  GetContactMessages(@Param('userId') userId:string) {
           return this.contactService.messagesAndCount(userId)
  }

}
