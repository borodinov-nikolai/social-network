import { DbService } from "src/db/db.service";
export declare class MessagesService {
    private readonly db;
    constructor(db: DbService);
    findMany(query: {
        senderId: string;
        receiverId?: string;
    }): Promise<({
        receiver: {
            id: number;
            login: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            avatar: string;
        };
    } & {
        id: number;
        read: boolean;
        content: string;
        timestamp: Date;
        senderId: number;
        receiverId: number;
    })[]>;
    getUnreadCount(userId: string): Promise<number>;
    makeRead({ userId, contactId }: {
        userId: number;
        contactId: number;
    }): Promise<void>;
}
