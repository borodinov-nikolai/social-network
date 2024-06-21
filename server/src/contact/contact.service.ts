import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ContactService {
    constructor(private readonly db: DbService){}

    async messagesAndCount(userId: string) {
        const contacts = await this.db.user.findMany({
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

        return contacts
    }
}
