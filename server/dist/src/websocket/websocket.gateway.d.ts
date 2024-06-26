import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TokenService } from 'src/auth/token.service';
export declare class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly tokenService;
    constructor(tokenService: TokenService);
    server: Server;
    readonly clients: Map<string, Socket>;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
}
