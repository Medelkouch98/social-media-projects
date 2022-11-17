import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RmqService } from '@social-media/backend-libs/common';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger, ValidationPipe, VersioningType } from '@nestjs/common';

const globalPrefix = 'posts-api';
const defaultVersion = '1';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupGlobalMiddlewares(app);
  setupSwagger(app);

  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('POSTS'));
  await app.startAllMicroservices();

  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('HTTP_PORT');
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  // await app.listen();
}
export function setupGlobalMiddlewares(app: INestApplication) {
  app.enableCors();
  return app
    .setGlobalPrefix(globalPrefix)
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion,
    })
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      })
    );
}

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Posts API')
    .setDescription('The posts API documentation')
    .setVersion('0.0.1')
    .addBearerAuth({ type: 'http' })
    .addTag('POSTS_API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);
}

bootstrap();
