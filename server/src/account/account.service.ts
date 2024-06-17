import { ForbiddenException, Injectable } from '@nestjs/common';
import { TokenService } from 'src/auth/token.service';
import { DbService } from 'src/db/db.service';


@Injectable()
export class AccountService {
    constructor(private readonly db: DbService, private tokenService: TokenService) { }

    async addContact(token: string, contactId: number) {
        try {
            const { id } = await this.tokenService.decodeToken(token)
            await this.db.user.update({
                where: {
                    id
                },
                data: {
                    contacts: {
                        connectOrCreate: {
                            where: {
                                id
                            },
                            create: {
                                contactId
                            }
                        }
                    }
                }
            })
        } catch (e) {
            console.error(e)
            throw new ForbiddenException()
        }


    }
}

