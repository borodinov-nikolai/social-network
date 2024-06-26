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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const token_service_1 = require("./token.service");
const db_service_1 = require("../db/db.service");
const axios_1 = require("axios");
let AuthService = class AuthService {
    constructor(usersService, tokenService, db) {
        this.usersService = usersService;
        this.tokenService = tokenService;
        this.db = db;
        this.signUp = async (data) => {
            const salt = 12;
            const password = data.password;
            const hash = await bcrypt.hash(password, salt);
            const user = await this.usersService.create({ ...data, password: hash });
            const { id, login, role } = user;
            const tokens = await this.tokenService.createTokens({ id, login, role });
            await this.db.refreshToken.create({
                data: {
                    userId: id,
                    token: tokens.refreshToken
                }
            });
            return tokens;
        };
        this.signIn = async (data) => {
            const user = await this.db.user.findUnique({
                where: {
                    email: data.email
                }
            });
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            const passwordCheck = await bcrypt.compare(data.password, user.password);
            if (passwordCheck) {
                const { id, login, role } = user;
                const tokens = await this.tokenService.createTokens({ id, login, role });
                await this.db.refreshToken.upsert({
                    where: {
                        userId: id
                    },
                    update: {
                        token: tokens.refreshToken
                    },
                    create: {
                        userId: id,
                        token: tokens.refreshToken
                    }
                });
                return tokens;
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        };
        this.refresh = async (token) => {
            if (!token) {
                throw new common_1.UnauthorizedException();
            }
            const payload = await this.tokenService.decodeToken(token);
            if (!payload) {
                throw new common_1.UnauthorizedException();
            }
            const userToken = await this.db.refreshToken.findUnique({
                where: {
                    userId: payload.id
                }
            });
            if (userToken?.token === token) {
                const tokens = await this.tokenService.createTokens(payload);
                await this.db.refreshToken.update({
                    where: {
                        userId: payload.id
                    },
                    data: {
                        token: tokens.refreshToken
                    }
                });
                return tokens;
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        };
        this.getMe = async (token) => {
            if (!token) {
                throw new common_1.ForbiddenException();
            }
            const payload = await this.tokenService.decodeToken(token);
            if (!payload) {
                throw new common_1.ForbiddenException();
            }
            try {
                const user = await this.db.user.findUnique({
                    where: {
                        id: payload?.id
                    },
                    include: {
                        contacts: {
                            include: {
                                contact: true
                            }
                        }
                    }
                });
                if (!user) {
                    throw new common_1.ForbiddenException();
                }
                delete user.password;
                return user;
            }
            catch (e) {
                console.error(e);
                throw new common_1.ForbiddenException();
            }
        };
        this.updateMe = async (token, data) => {
            if (!token) {
                throw new common_1.ForbiddenException();
            }
            const payload = await this.tokenService.decodeToken(token);
            if (!payload) {
                throw new common_1.ForbiddenException();
            }
            try {
                await this.db.user.update({
                    where: {
                        id: payload.id,
                    },
                    data
                });
            }
            catch (e) {
                console.error(e);
                throw new common_1.ForbiddenException();
            }
        };
        this.google = async (code) => {
            const url = 'https://oauth2.googleapis.com/token';
            const clientId = '1027607799493-leqd0k3htg8dljcjtbea14nn26tgil9o.apps.googleusercontent.com';
            const clientSecret = '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';
            try {
                const response = await axios_1.default.post(url, {
                    code,
                    client_id: clientId,
                    client_secret: clientSecret,
                    redirect_uri: 'http://localhost:3000/auth/google',
                    grant_type: 'authorization_code',
                });
                const token = response?.data?.access_token;
                const googleUser = await axios_1.default.get('https://people.googleapis.com/v1/people/me', {
                    params: {
                        personFields: 'names,emailAddresses',
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const userLogin = googleUser.data.names[0].displayName;
                const userEmail = googleUser.data.emailAddresses[0].value;
                let dbUser;
                dbUser = await this.db.user.findUnique({
                    where: {
                        email: userEmail
                    }
                });
                if (!dbUser) {
                    dbUser = await this.db.user.create({
                        data: {
                            login: userLogin,
                            email: userEmail,
                            password: '',
                            role: 'user'
                        }
                    });
                }
                if (!dbUser) {
                    throw new common_1.UnauthorizedException();
                }
                const { id, login, role } = dbUser || {};
                const tokens = await this.tokenService.createTokens({ id, login, role });
                await this.db.refreshToken.upsert({
                    where: {
                        userId: id
                    },
                    update: {
                        token: tokens.refreshToken
                    },
                    create: {
                        userId: id,
                        token: tokens.refreshToken
                    }
                });
                return tokens;
            }
            catch (e) {
                console.error(e);
                throw new common_1.UnauthorizedException();
            }
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, token_service_1.TokenService, db_service_1.DbService])
], AuthService);
//# sourceMappingURL=auth.service.js.map