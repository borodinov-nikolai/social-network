import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dtos/signUp.dto';
import * as bcrypt from 'bcrypt'
import { TokenService } from './token.service';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AuthService {
constructor (private readonly usersService: UsersService, private readonly tokenService: TokenService, private readonly db: DbService){}

signUp = async (data: SignUpDto)=> {
   const salt = 10
   const password = data.password
   const hash = await bcrypt.hash(password, salt)
   const user = await this.usersService.create({...data, password: hash})
   const {id, login, role} = user 
   const tokens = await this.tokenService.createTokens({id, login, role})
   await this.db.refreshToken.create({
      data: {
         userId: id,
         token: tokens.refreshToken
      }
   })
   return tokens
}

getMe = async (token: string)=> {
  const {id}: {id: number} = await this.tokenService.decodeToken(token)
  const user = await this.db.user.findUnique({
   where: {
      id
   }
  })
       return user
}


}
