import { MessagesService } from "./message.service";
import { Message } from "./entities/message.entity";
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getMessages(query: {
        senderId: string;
        receiverId?: string;
    }): Promise<Message[]>;
    getUnreadMessagesCount(userId: string): Promise<number>;
    makeRead(body: {
        userId: number;
        contactId: number;
    }): void;
}
