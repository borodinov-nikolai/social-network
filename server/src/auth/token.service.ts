import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";




@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService){}

     async createTokens({id, login, role}: {id: number, login: string, role: 'user' | 'admin'}) {
      try {
         const accessToken = await this.jwtService.signAsync({id, login, role})
         const refreshToken = await this.jwtService.signAsync({id, login, role})
         return {accessToken, refreshToken}
      } catch(e) {
         console.error(e)
      }
            
      }



      async decodeToken(token: string) {
         try {
            await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET})
            return await this.jwtService.decode(token)
         } catch(e) {
            console.error(e)
         }
      }
}