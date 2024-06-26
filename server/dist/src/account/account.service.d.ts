import { TokenService } from 'src/auth/token.service';
import { DbService } from 'src/db/db.service';
export declare class AccountService {
    private readonly db;
    private tokenService;
    constructor(db: DbService, tokenService: TokenService);
    addContact(token: string, contactId: number): Promise<void>;
}
