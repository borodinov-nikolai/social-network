import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { DbModule } from 'src/db/db.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DbModule, UsersModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
