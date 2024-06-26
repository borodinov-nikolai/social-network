import { ContactService } from './contact.service';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    GetContactMessages(userId: string): Promise<{
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
