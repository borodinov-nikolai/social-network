import { DbService } from 'src/db/db.service';
export declare class ContactService {
    private readonly db;
    constructor(db: DbService);
    messagesAndCount(userId: string): Promise<{
        contact: {
            id: number;
            login: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            avatar: string;
        };
        count: number;
    }[]>;
}
