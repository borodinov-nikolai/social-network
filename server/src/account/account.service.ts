import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AccountService {
    constructor(private readonly userService: UsersService){}

    setAccount(data){
        this.userService.update(data)
    }
}

