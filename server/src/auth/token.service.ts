import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";




@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService){}
     async createTokens({id, login, role}: {id: number, login: string, role: 'USER' | 'ADMIN'}) {
               const accessToken = await this.jwtService.signAsync({id, login, role})
               const refreshToken = await this.jwtService.signAsync({id, login, role})
               return {accessToken, refreshToken}
      }
}