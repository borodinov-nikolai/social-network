import { SignUpDto } from 'src/auth/dtos/signUp.dto';
import { DbService } from 'src/db/db.service';
export declare class UsersService {
    private readonly db;
    constructor(db: DbService);
    findAll: (param: any) => Promise<{
        id: number;
        login: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string;
    }[]>;
    create: (data: SignUpDto) => Promise<{
        id: number;
        login: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string;
    }>;
    update: ({ userId, data }: {
        userId: any;
        data: any;
    }) => Promise<void>;
}
