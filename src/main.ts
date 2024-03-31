import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: add swagger integration

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
