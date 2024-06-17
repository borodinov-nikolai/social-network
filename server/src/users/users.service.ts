import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/auth/dtos/signUp.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
constructor (private readonly db: DbService){}


   findAll = async (param: any)=> {
    const {search} = param || {}
    const users = await this.db.user.findMany({
      where: {
        login: {
          contains: search,
          mode: 'insensitive'
        }
      }
    })
    return users
   }

   create = async (data: SignUpDto)=> {
    const user = await this.db.user.create({
        data
    })
      return user
  }

  update = async ({userId, data})=> {
    await this.db.user.update({
      where:{
        id: userId
      },
       data
    })
  }
  
}



