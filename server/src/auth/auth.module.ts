import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TokenService } from './token.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [UsersModule, DbModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
