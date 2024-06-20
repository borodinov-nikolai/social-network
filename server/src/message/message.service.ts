import { Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";




@Injectable()
export class MessagesService {
    constructor(private readonly db: DbService){}
    
    async findMany(query: {senderId: string, receiverId?: string}){
        const {senderId, receiverId} = query
        return await this.db.message.findMany({
            where:{
               senderId: +senderId,
               receiverId: receiverId ? +receiverId: undefined
            }
        })
    }
}