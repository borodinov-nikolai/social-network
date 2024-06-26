/// <reference types="cookie-parser" />
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signUp.dto';
import { Request, Response } from 'express';
import { SignInDto } from './dtos/signIn.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(body: SignUpDto, res: Response): Promise<{
        jwt: string;
    }>;
    signIn(body: SignInDto, res: Response): Promise<{
        jwt: string;
    }>;
    refresh(res: Response, req: Request): Promise<{
        jwt: string;
    }>;
    signOut(res: Response): Promise<void>;
    getMe(req: Request): Promise<{
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
    updateMe(file: any, req: Request, body: any): Promise<void>;
    oauthGoogle(res: Response, body: {
        code: string;
    }): Promise<{
        jwt: string;
    }>;
}
