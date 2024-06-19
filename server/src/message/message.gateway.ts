import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { SocketGateway } from "src/websocket/websocket.gateway";
import { Socket } from 'socket.io';


@WebSocketGateway()
export class MessageGateway implements OnGatewayInit {
    constructor(private readonly commonGateway: SocketGateway ){}

    afterInit() {
        console.log('MessageGateway Initialized')
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data, @ConnectedSocket() client: Socket) {
        const {userId, contactId, message} = data || {} 
        const clients = this.commonGateway.clients
        const targetClient = clients.get(data.contactId)
        if(targetClient){
            targetClient.emit('receiveMessage', {from: userId, message})
        }
    }
}