"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const db_module_1 = require("./db/db.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const jwt_1 = require("@nestjs/jwt");
const file_module_1 = require("./file/file.module");
const platform_express_1 = require("@nestjs/platform-express");
const posts_module_1 = require("./posts/posts.module");
const serve_static_1 = require("@nestjs/serve-static");
const static_config_1 = require("../configs/static.config");
const account_module_1 = require("./account/account.module");
const message_module_1 = require("./message/message.module");
const websocket_module_1 = require("./websocket/websocket.module");
const contact_module_1 = require("./contact/contact.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env'
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET
            }),
            serve_static_1.ServeStaticModule.forRoot(static_config_1.staticConfig),
            platform_express_1.MulterModule,
            db_module_1.DbModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            file_module_1.FileModule,
            posts_module_1.PostsModule,
            account_module_1.AccountModule,
            websocket_module_1.WebsocketModule,
            message_module_1.MessageModule,
            contact_module_1.ContactModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map