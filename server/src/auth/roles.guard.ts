import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { Roles } from "./roles.decorator";
import { TokenService } from "./token.service";



@Injectable()
export class RolesGuard implements CanActivate {
   constructor(private reflector: Reflector, private tokenService: TokenService){}
   async canActivate(
        context: ExecutionContext,
   ): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler())
    
    if(roles.includes('all')){
       return true
      }

      const request = context.switchToHttp().getRequest<Request>()
      const token = request?.headers?.authorization?.split(' ')[1]

    if(token) {
       const payload: {role: string} | undefined = await this.tokenService.decodeToken(token)
       if(payload && roles.includes(payload.role)) { 
         return true
        }
    }
       return false
   }
     
}