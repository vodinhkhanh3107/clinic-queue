import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.use(helmet());
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: (process.env.CORS_ORIGIN ?? '').split(',').map((s) => s.trim()).filter(Boolean),
    credentials: true,
  });
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`API chạy tại http://localhost:${process.env.PORT ?? 3000}/api/v1`, 'Bootstrap');
}
await bootstrap();
