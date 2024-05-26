import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT
  app.setGlobalPrefix('api')
  app.enableCors({origin: '*'})
  await app.listen(PORT, () => console.log(`server started at ${PORT}`));
}
bootstrap();
