import { Body, Controller, Post, Req } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Аккаунт')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('add-contact')
  addContact(@Req() req: Request, @Body()body) {
        const token = req.headers['authorization']?.split(' ')[1]
        this.accountService.addContact(token, Number(body.contactId))
  }
}
