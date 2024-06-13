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


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env'
  }),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET
  }),
  MulterModule.register({
    dest: join(process.cwd(), 'filed', 'uploads', 'images')
  }),
    DbModule,
    AuthModule,
    UsersModule,
    FileModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
