import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TokenService } from 'src/auth/token.service';


@WebSocketGateway({cors: true})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly tokenService: TokenService){}
    @WebSocketServer()
    server: Server
    private clients: Map<string, Socket> = new Map()
    async handleConnection(client: Socket) {
        try {
            const token = client.handshake.query.token
            const {id: userId} = await this.tokenService.decodeToken(token as string)
            console.log(userId)
            client.data.userId = userId
            this.clients.set(userId, client)
        } catch(e){
            client.disconnect()
        }
         
    }

    handleDisconnect(client: Socket) {
        const userId = client.data.userId
        if(userId) {
           this.clients.delete(userId)
        }
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data, @ConnectedSocket() client: Socket) {
       
        const targetClient = this.clients.get(data.contactId)
        if(targetClient){
            targetClient.emit('receiveMessage', data.message)
        }
    }
}

