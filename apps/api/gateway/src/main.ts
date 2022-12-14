import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  // Proxy endpoints
  app.use(
    '/auth-api',
    createProxyMiddleware({
      target: process.env.AUTH_URL,
      changeOrigin: true
    })
  );

  app.use(
    '/media-api',
    createProxyMiddleware({
      target: process.env.MEDIA_URL,
      changeOrigin: true
    })
  );

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}


bootstrap();
