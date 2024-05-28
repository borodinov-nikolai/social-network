import { Body, Controller, Post, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signUp.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Response } from 'express';




@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: 'Регистрация нового пользователя'})
  @ApiResponse({
    status: 201,
    description: 'Успешная регистрация нового пользователя', 
    type: User
  })
  @Post('/sign-up')
  async signUp(@Body() body: SignUpDto, @Res({passthrough: true}) res:Response){
    
    const {accessToken, refreshToken} = await this.authService.signUp(body)
     
    res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
    return {jwt: accessToken}
  }
}
