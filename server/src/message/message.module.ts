import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { WebsocketModule } from 'src/websocket/websocket.module';
import { DbModule } from 'src/db/db.module';
import { MessagesController } from './message.controller';
import { MessagesService } from './message.service';

@Module({
  imports: [WebsocketModule, DbModule],
  controllers: [MessagesController],
  providers: [MessageGateway, MessagesService],
})
export class MessageModule {}
