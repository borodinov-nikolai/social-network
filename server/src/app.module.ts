import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { FileModule } from './file/file.module';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { PostsModule } from './posts/posts.module';
import { multerConfig } from 'configs/multer.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { staticConfig } from 'configs/static.config';
import { AccountModule } from './account/account.module';
import { MessageModule } from './message/message.module';
import { WebsocketModule } from './websocket/websocket.module';
import { ContactModule } from './contact/contact.module';


@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: '.env'
  }),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET
  }),
  ServeStaticModule.forRoot(staticConfig),
    MulterModule,
    DbModule,
    AuthModule,
    UsersModule,
    FileModule,
    PostsModule,
    AccountModule,
    WebsocketModule,
    MessageModule,
    ContactModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
