import { Body, Controller, Get, Post, Query, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signUp.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Request, Response } from 'express';
import { SignInDto } from './dtos/signIn.dto';
import axios from 'axios';





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




  @ApiOperation({summary: 'Обновление токенов'})
  @ApiResponse({
    status: 201,
    description: 'Успешно', 
    type: null
  })
  @Post('/refresh')
  async refresh(@Res({passthrough: true}) res:Response, @Req() req: Request){
  const refreshToken = req.cookies.refreshToken
   const tokens = await this.authService.refresh(refreshToken)
   if(tokens) {
    res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
    return {jwt: tokens.accessToken}
   }

  }




  
  @ApiOperation({summary: 'Выход из аккаунта'})
  @ApiResponse({
    status: 201,
    description: 'Успешно', 
    type: null
  })
  @Post('/sign-out')
  async signOut(@Res({passthrough: true}) res: Response){
         res.clearCookie('refreshToken')
  }
  

 
  
  @ApiOperation({summary: 'Получение данных пользователя'})
  @ApiResponse({
    status: 200,
    description: 'Успешно', 
    type: User
  })

  @Get('/me')

  async getMe(@Req() req: Request){  
       const token = req.headers['authorization']?.split(' ')[1]
       return await this.authService.getMe(token)
  }


  @ApiOperation({summary: 'Авторизация через Google'})
  @ApiResponse({
    status: 201,
    description: 'Успешно', 
    type: User
  })

  @Get('/google')

  async oauthGoogle(@Res() res: Response, @Query('code') code){  
         console.log(code)
         const url = 'https://oauth2.googleapis.com/token';
    const client_id = '1027607799493-leqd0k3htg8dljcjtbea14nn26tgil9o.apps.googleusercontent.com'; // Ваш клиентский идентификатор
    const client_secret = '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'; 
         try {
          const response = await axios.post(url, {
            code,
            client_id,
            client_secret,
            redirect_uri: 'http://localhost:5000/api/auth/google',
            grant_type: 'authorization_code',
          })
          const token = response?.data?.access_token
          const user = await axios.get('https://people.googleapis.com/v1/people/me' , {
            params: {
              personFields: 'names, emailAddresses',
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          console.log(user.data)
         } catch(e){
          console.error(e)
          }
        // res.redirect('http://localhost:3000')
  }


}
