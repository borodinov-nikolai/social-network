import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/auth/dtos/signUp.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
constructor (private readonly db: DbService){}

   create = async (data: SignUpDto)=> {
    const user = await this.db.user.create({
        data
    })
      return user
  }
}



