import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { WebsocketModule } from 'src/websocket/websocket.module';

@Module({
  imports: [WebsocketModule],
  providers: [MessageGateway],
})
export class MessageModule {}
