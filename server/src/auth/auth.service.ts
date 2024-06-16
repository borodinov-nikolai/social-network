import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dtos/signUp.dto';
import * as bcrypt from 'bcrypt'
import { TokenService } from './token.service';
import { DbService } from 'src/db/db.service';
import { SignInDto } from './dtos/signIn.dto';
import axios from 'axios';
import { User } from 'src/users/entities/user.entity';

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

   updateMe = async (token: string | undefined, data)=> {
      if (!token) {
         throw new ForbiddenException()
      }

      const payload: { id: number } | undefined = await this.tokenService.decodeToken(token)
      if (!payload) {
         throw new ForbiddenException()
      }

      try {
         await this.db.user.update({
            where: {
               id: payload.id,
            }, 
            data
         })

      } catch(e){
         console.error(e)
         throw new ForbiddenException()
      }
   }


   google = async (code: string)=> {
      const url = 'https://oauth2.googleapis.com/token';
      const clientId = '1027607799493-leqd0k3htg8dljcjtbea14nn26tgil9o.apps.googleusercontent.com';
      const clientSecret = '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';

      try {
         const response = await axios.post(url, {
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: 'http://localhost:3000/auth/google',
            grant_type: 'authorization_code',
          });
          const token = response?.data?.access_token
     

       const googleUser = await axios.get('https://people.googleapis.com/v1/people/me',{
         params: {
           personFields: 'names,emailAddresses',
         },
         headers: {
           Authorization: `Bearer ${token}`
         }
       })
       const userLogin = googleUser.data.names[0].displayName
       const userEmail = googleUser.data.emailAddresses[0].value
       
       let dbUser: User
        dbUser = await this.db.user.findUnique({
         where: {
            email: userEmail
         }
       }) 
     
       if(!dbUser) {
         dbUser = await this.db.user.create({
            data: {
               login: userLogin,
               email: userEmail,
               password: '',
               role: 'user'
            }
         })
       } 

       if(!dbUser) {
         throw new UnauthorizedException()
       }
       const {id, login, role} = dbUser || {}
       const tokens = await this.tokenService.createTokens({id, login, role})
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
      })
       return tokens
      } catch(e){
       console.error(e)
       throw new UnauthorizedException()
       }
  
   }

}
