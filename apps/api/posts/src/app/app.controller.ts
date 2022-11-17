import { Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('getServices', data);
    return this.appService.getHello();
  }

  @Get()
  getHello2() {
    return "Hello World!";
  }

  @MessagePattern({ cmd: 'getPosts' })
  async getPosts(@Payload() data: any) {
    console.log('getPosts', data);
    return this.appService.getHello();
  }

  @Post()
  postHello() {
    return "Hello post!";
  }

}
