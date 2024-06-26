import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dtos/signUp.dto';
import { TokenService } from './token.service';
import { DbService } from 'src/db/db.service';
import { SignInDto } from './dtos/signIn.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly tokenService;
    private readonly db;
    constructor(usersService: UsersService, tokenService: TokenService, db: DbService);
    signUp: (data: SignUpDto) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signIn: (data: SignInDto) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh: (token: string | undefined) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getMe: (token: string | undefined) => Promise<{
        contacts: ({
            contact: {
                id: number;
                login: string;
                email: string;
                password: string;
                role: import(".prisma/client").$Enums.Role;
                avatar: string;
            };
        } & {
            id: number;
            userId: number;
            contactId: number;
        })[];
    } & {
        id: number;
        login: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string;
    }>;
    updateMe: (token: string | undefined, data: any) => Promise<void>;
    google: (code: string) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
