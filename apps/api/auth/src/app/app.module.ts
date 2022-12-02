import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgreDatabaseModule, RmqModule, RMQ_EXCHANGES } from '@social-media/backend-libs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import * as Joi from 'joi';

const {queues, routingKeys, ...main_exchange} = RMQ_EXCHANGES.main;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
      validationSchema: Joi.object({
        POSTGRESQL_HOST: Joi.string().required(),
        POSTGRESQL_PORT: Joi.number().required(),
        POSTGRESQL_USERNAME: Joi.string().required(),
        POSTGRESQL_PASSWORD: Joi.string().required(),
        POSTGRESQL_DATABASE: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    RmqModule.register({
      exchanges: [main_exchange],
    }),
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_NODE,
    }),
    PostgreDatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
