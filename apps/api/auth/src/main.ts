import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { TransformInterceptor } from './interceptors';

const globalPrefix = 'auth-api';
const defaultVersion = '1';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupGlobalMiddlewares(app);
  setupSwagger(app);

  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}
export function setupGlobalMiddlewares(app: INestApplication) {
  app.enableCors();
  return app
    .setGlobalPrefix(globalPrefix)
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion,
    })
    .useGlobalInterceptors(new TransformInterceptor())
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      })
    );
}

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('The auth API documentation')
    .setVersion('0.0.1')
    .addBearerAuth({ type: 'http' })
    .addTag('AUTH_API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);
}

bootstrap();
