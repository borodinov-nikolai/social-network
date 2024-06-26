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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signUp_dto_1 = require("./dtos/signUp.dto");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../users/entities/user.entity");
const signIn_dto_1 = require("./dtos/signIn.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_config_1 = require("../../configs/multer.config");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(body, res) {
        const { accessToken, refreshToken } = await this.authService.signUp(body);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        return { jwt: accessToken };
    }
    async signIn(body, res) {
        const { accessToken, refreshToken } = await this.authService.signIn(body);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        return { jwt: accessToken };
    }
    async refresh(res, req) {
        const refreshToken = req.cookies.refreshToken;
        const tokens = await this.authService.refresh(refreshToken);
        if (tokens) {
            res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
            return { jwt: tokens.accessToken };
        }
    }
    async signOut(res) {
        res.clearCookie('refreshToken');
    }
    async getMe(req) {
        const token = req.headers['authorization']?.split(' ')[1];
        return await this.authService.getMe(token);
    }
    async updateMe(file, req, body) {
        const token = req.headers['authorization']?.split(' ')[1];
        const { login, email } = body;
        const avatar = file && file.filename;
        return await this.authService.updateMe(token, { login, email, avatar: avatar ? avatar : null });
    }
    async oauthGoogle(res, body) {
        const { accessToken, refreshToken } = await this.authService.google(body.code);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        return { jwt: accessToken };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Регистрация нового пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Успешная регистрация нового пользователя',
        type: user_entity_1.User
    }),
    (0, common_1.Post)('/sign-up'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signUp_dto_1.SignUpDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Авторизация пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Успешная авторизация пользователя',
        type: user_entity_1.User
    }),
    (0, common_1.Post)('/sign-in'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signIn_dto_1.SignInDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Обновление токенов' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Успешно',
        type: null
    }),
    (0, common_1.Post)('/refresh'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Выход из аккаунта' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Успешно',
        type: null
    }),
    (0, common_1.Post)('/sign-out'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signOut", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение данных пользователя' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Успешно',
        type: user_entity_1.User
    }),
    (0, common_1.Get)('/me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getMe", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Авторизация через Google' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Успешно',
        type: user_entity_1.User
    }),
    (0, common_1.Post)('/me'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', multer_config_1.multerConfig)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateMe", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Авторизация через Google' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Успешно',
        type: user_entity_1.User
    }),
    (0, common_1.Post)('/google'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "oauthGoogle", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map