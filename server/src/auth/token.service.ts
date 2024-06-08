import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";




@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService){}

     async createTokens({id, login, role}: {id: number, login: string, role: 'user' | 'admin'}): Promise<{accessToken: string, refreshToken: string}> {
      try {
         const accessToken = await this.jwtService.signAsync({id, login, role}, {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN})
         const refreshToken = await this.jwtService.signAsync({id, login, role}, {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN})
         return {accessToken, refreshToken}
      } catch(e) {
         console.error('Error creating tokens:', e)
      }
            
      }



      async decodeToken(token: string): Promise<any> {
         try {
            await this.jwtService.verifyAsync(token)
            return await this.jwtService.decode(token)
         } catch(e) {
            console.error('Error decoding token:', e)
         }
      }
}