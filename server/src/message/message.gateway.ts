import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { SocketGateway } from "src/websocket/websocket.gateway";
import { Socket } from 'socket.io';
import { DbService } from "src/db/db.service";


@WebSocketGateway()
export class MessageGateway implements OnGatewayInit {
    constructor(private readonly commonGateway: SocketGateway, private readonly db: DbService ){}

    afterInit() {
        console.log('MessageGateway Initialized')
    }

    @SubscribeMessage('message')
    async handleMessage(@MessageBody() data, @ConnectedSocket() client: Socket) {
        const {senderId, receiverId} = data || {} 
        const clients = this.commonGateway.clients
        const targetClient = clients.get(receiverId)
        const message = await this.db.message.create({
           data
        })
        
        if(targetClient){
            targetClient.emit('receiveMessage', {senderId, message})
        }
    }
}