import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Ruxsat etilgan HTTP metodlar
    credentials: true, // Agar cookie kerak bo'lsa
  });
  const host = "192.168.32.7"
  await app.listen(process.env.PORT ?? 3000,host);
}
bootstrap();
