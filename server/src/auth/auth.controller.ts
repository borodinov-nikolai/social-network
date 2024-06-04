import { Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signUp.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Request, Response } from 'express';
import { RolesGuard } from './roles.guard';
import { SignInDto } from './dtos/signIn.dto';




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

  @ApiOperation({summary: 'Авторизация пользователя'})
  @ApiResponse({
    status: 201,
    description: 'Успешная авторизация пользователя', 
    type: User
  })
  @Post('/sign-in')
  async signIn(@Body() body: SignInDto, @Res({passthrough: true}) res:Response){
    
    const {accessToken, refreshToken} = await this.authService.signIn(body)
     
    res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
    return {jwt: accessToken}
  }
  
  @ApiOperation({summary: 'Выход из аккаунта'})
  @ApiResponse({
    status: 200,
    description: 'Успешно', 
    type: null
  })

  @Post('/sign-out')
  async signOut(@Res() res: Response){
         res.clearCookie('refreshToken')
  }
  
  @ApiOperation({summary: 'Регистрация нового пользователя'})
  @ApiResponse({
    status: 201,
    description: 'Успешная регистрация нового пользователя', 
    type: User
  })

  @Get('/me')
  async getMe(@Req() req: Request){  
       const token = req.headers['authorization']?.split(' ')[1]
       return await this.authService.getMe(token)
  }


}