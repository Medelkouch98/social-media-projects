import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RmqModule, RMQ_EXCHANGES } from '@social-media/backend-libs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { PostgreDatabaseModule } from '@social-media/backend-libs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const { queues, routingKeys, ...main_exchange } = RMQ_EXCHANGES.main;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    RmqModule.register({
      exchanges: [main_exchange],
    }),
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_NODE,
    }),
    PostgreDatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
