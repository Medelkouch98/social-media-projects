import { AmqpConnection } from '@golevelup/nestjs-rabbitmq/lib/amqp/connection';
import { Controller, Get } from '@nestjs/common';
import { RMQ_EXCHANGES } from '@social-media/backend-libs/common';

import { AppService } from './app.service';

const {queues, routingKeys, ...main_exchange} = RMQ_EXCHANGES.main;
@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  @Get()
  async getData() {
    const response = await this.amqpConnection.request({
      exchange: main_exchange.name,
      routingKey: RMQ_EXCHANGES.main.routingKeys.auth_rpc_login,
      payload: {
        request: this.appService.getData(),
      }
    });
    return response;
  }
}
