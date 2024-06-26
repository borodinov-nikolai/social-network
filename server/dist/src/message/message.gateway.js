"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const websocket_gateway_1 = require("../websocket/websocket.gateway");
const db_service_1 = require("../db/db.service");
let MessageGateway = class MessageGateway {
    constructor(commonGateway, db) {
        this.commonGateway = commonGateway;
        this.db = db;
    }
    afterInit() {
        console.log('MessageGateway Initialized');
    }
    async handleMessage(data) {
        const { senderId, receiverId } = data || {};
        const clients = this.commonGateway.clients;
        const targetClient = clients.get(receiverId);
        const message = await this.db.message.create({
            data
        });
        if (targetClient) {
            targetClient.emit('receiveMessage', { senderId, message });
        }
    }
    async handleTyping(data) {
        const { senderId, receiverId, value } = data || {};
        const clients = this.commonGateway.clients;
        const targetClient = clients.get(receiverId);
        if (targetClient) {
            targetClient.emit('typing', { receiverId: senderId, value });
        }
    }
};
exports.MessageGateway = MessageGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "handleTyping", null);
exports.MessageGateway = MessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [websocket_gateway_1.SocketGateway, db_service_1.DbService])
], MessageGateway);
//# sourceMappingURL=message.gateway.js.map