import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Đảm bảo FE có thể gọi BE
  await app.listen(8080);
  console.log(`Core Backend is running on: http://localhost:8080`);
}
bootstrap();
