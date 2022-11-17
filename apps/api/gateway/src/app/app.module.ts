import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  AuthModule,
  DatabaseModule,
  RmqModule,
} from '@social-media/backend-libs/common';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  COMMUNICATION_SERVICE,
  MEDIA_SERVICE,
  POSTS_SERVICE,
  SEARCH_SERVICE,
  TAGS_SERVICE,
} from '../constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/api/gateway/.env',
    }),
    // DatabaseModule,
    // ClientsModule.register([{ name: `${ POSTS_SERVICE }_TCP`, transport: Transport.TCP }]),
    // RmqModule.register([
    //   {
    //     name: POSTS_SERVICE,
    //   },
    //   {
    //     name: COMMUNICATION_SERVICE,
    //   },
    //   {
    //     name: SEARCH_SERVICE,
    //   },
    //   {
    //     name: TAGS_SERVICE,
    //   },
    //   {
    //     name: MEDIA_SERVICE,
    //   },
    // ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
