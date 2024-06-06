import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dtos/signUp.dto';
import * as bcrypt from 'bcrypt'
import { TokenService } from './token.service';
import { DbService } from 'src/db/db.service';
import { SignInDto } from './dtos/signIn.dto';

@Injectable()
export class AuthService {
   constructor(private readonly usersService: UsersService, private readonly tokenService: TokenService, private readonly db: DbService) { }

   signUp = async (data: SignUpDto) => {
      const salt = 12
      const password = data.password
      const hash = await bcrypt.hash(password, salt)
      const user = await this.usersService.create({ ...data, password: hash })
      const { id, login, role } = user
      const tokens = await this.tokenService.createTokens({ id, login, role })
      await this.db.refreshToken.create({
         data: {
            userId: id,
            token: tokens.refreshToken
         }
      })
      return tokens
   }

   signIn = async (data: SignInDto) => {
      
      const user = await this.db.user.findUnique({
         where: {
            email: data.email
         }
      })


      if (!user) {
         throw new UnauthorizedException()
      }

         const passwordCheck = await bcrypt.compare(data.password, user.password)
         if (passwordCheck) {
            const { id, login, role } = user
            const tokens = await this.tokenService.createTokens({ id, login, role })
            await this.db.refreshToken.update({
               where: {
                  userId: id
               },
               data: {
                  token: tokens.refreshToken
               }
            })
            return tokens
         } else {
            throw new UnauthorizedException()
         }
      


   }

   refresh = async (token: string | undefined) => {
      if (!token) {
         throw new UnauthorizedException()
      }


      const payload: { id: number, login: string, role: 'user' | 'admin' } | undefined = await this.tokenService.decodeToken(token)

      if (!payload) {
         throw new UnauthorizedException()
      }


      const userToken = await this.db.refreshToken.findUnique({
         where: {
            userId: payload.id
         }
      })

      if (userToken?.token === token) {
         const tokens = await this.tokenService.createTokens(payload)
         await this.db.refreshToken.update({
            where: {
               userId: payload.id
            },
            data: {
               token: tokens.refreshToken
            }
         })

         return tokens
      } else {
         throw new UnauthorizedException()
      }

   }

   getMe = async (token: string | undefined) => {

      if (!token) {
         throw new ForbiddenException()
      }

      const payload: { id: number } | undefined = await this.tokenService.decodeToken(token)
      if (!payload) {
         throw new ForbiddenException()
      }


      try {
         const user = await this.db.user.findUnique({
            where: {
               id: payload?.id
            }
         })
         if (!user) {
            throw new ForbiddenException()
         }
         delete user.password
         return user
      } catch (e) {
         console.error(e)
         throw new ForbiddenException()
      }




   }


}
