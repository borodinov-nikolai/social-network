import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ContactService {
    constructor(private readonly db: DbService){}

    async messagesAndCount(userId: string) {
        const contactsWithMessages = await this.db.user.findMany({
            where: {
                OR: [{
                    sentMessages: {
                        some: {
                            receiverId: +userId 
                        }
                    }},
                      {
                        receivedMessages: {
                            some: {
                                senderId: +userId
                            }
                        }
                      }
                ]
               
            }
        })

        const contactsWithCount = contactsWithMessages.map(async (contact)=> {
            const count = await this.db.message.count({
                where: {
                    senderId: contact.id,
                    receiverId: +userId,
                    read: false
                }
            })
            console.log(count)
            return {contact, count}
        })
    
        return await Promise.all(contactsWithCount)
    }

}
