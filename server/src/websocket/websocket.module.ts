import { Module } from '@nestjs/common';
import { SocketGateway } from './websocket.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [SocketGateway],
  exports: [SocketGateway]
})
export class WebsocketModule {}
