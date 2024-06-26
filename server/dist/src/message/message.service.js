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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../db/db.service");
let MessagesService = class MessagesService {
    constructor(db) {
        this.db = db;
    }
    async findMany(query) {
        const { senderId, receiverId } = query;
        return await this.db.message.findMany({
            where: {
                OR: [
                    {
                        senderId: +senderId,
                        receiverId: receiverId ? +receiverId : undefined
                    },
                    {
                        senderId: receiverId ? +receiverId : undefined,
                        receiverId: +senderId
                    }
                ]
            },
            orderBy: {
                timestamp: 'asc'
            },
            include: {
                receiver: true
            }
        });
    }
    async getUnreadCount(userId) {
        return await this.db.message.count({
            where: {
                receiverId: +userId,
                read: false
            },
        });
    }
    async makeRead({ userId, contactId }) {
        try {
            await this.db.message.updateMany({
                where: {
                    senderId: contactId,
                    receiverId: userId
                },
                data: {
                    read: true
                }
            });
        }
        catch (e) {
            console.error(e);
        }
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], MessagesService);
//# sourceMappingURL=message.service.js.map