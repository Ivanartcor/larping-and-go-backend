import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/static/',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
