import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule, DatabaseModule } from '@social-media/backend-libs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '../../.env',
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_POSTS_QUEUE: Joi.string().required(),
        HTTP_PORT: Joi.number().required().default(3001),
      })
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
