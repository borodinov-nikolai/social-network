import { JwtService } from "@nestjs/jwt";
export declare class TokenService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    createTokens({ id, login, role }: {
        id: number;
        login: string;
        role: 'user' | 'admin';
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    decodeToken(token: string): Promise<any>;
}
