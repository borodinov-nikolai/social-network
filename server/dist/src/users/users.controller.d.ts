import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(param: any): Promise<{
        id: number;
        login: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string;
    }[]>;
}
