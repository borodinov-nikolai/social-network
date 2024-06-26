import { OnGatewayInit } from "@nestjs/websockets";
import { SocketGateway } from "src/websocket/websocket.gateway";
import { DbService } from "src/db/db.service";
export declare class MessageGateway implements OnGatewayInit {
    private readonly commonGateway;
    private readonly db;
    constructor(commonGateway: SocketGateway, db: DbService);
    afterInit(): void;
    handleMessage(data: any): Promise<void>;
    handleTyping(data: any): Promise<void>;
}
