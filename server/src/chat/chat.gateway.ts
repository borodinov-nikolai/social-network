import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({cors: true})
export class ChatGateway {
    @WebSocketServer()
    server: Server
    @SubscribeMessage('message')
    hadleEvent(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
            console.log(data)
    }
}

