import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Аккаунт')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  setAccount(@Body()body) {
        
  }
}
