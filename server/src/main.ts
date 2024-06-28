import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';




async function bootstrap() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "https://petproekt.ru", credentials: true })
  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.useGlobalPipes( new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle('Practice api')
    .setDescription('The practice api description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  await app.listen(PORT, () => console.log(`server started at ${PORT}`));
}

bootstrap();
