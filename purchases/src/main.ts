import { NestFactory } from '@nestjs/core';
import { AppModule } from './http/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);
}
bootstrap();
