import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env'
  }), DbModule, AuthModule, UsersModule,  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '1d'}
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
