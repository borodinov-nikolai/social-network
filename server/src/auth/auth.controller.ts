import { Body, Controller, Get, Post, Query, Req, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signUp.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Request, Response } from 'express';
import { SignInDto } from './dtos/signIn.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'configs/multer.config';





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
  @Post('/me')
  @UseInterceptors(FileInterceptor('avatar', multerConfig))
  async updateMe(@UploadedFile() file, @Req() req: Request, @Body() body){  
       const token = req.headers['authorization']?.split(' ')[1]
       const {login, email} = body
       const avatar = file && file.filename
       return await this.authService.updateMe(token, {login, email, avatar: avatar? avatar: null})
  }


  @ApiOperation({summary: 'Авторизация через Google'})
  @ApiResponse({
    status: 201,
    description: 'Успешно', 
    type: User
  })


  @Post('/google')

  async oauthGoogle(@Res({passthrough: true}) res: Response, @Body() body: {code: string}){  
        const {accessToken, refreshToken} = await this.authService.google(body.code)
        res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000})
        return {jwt: accessToken}
  }


}
