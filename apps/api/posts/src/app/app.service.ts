import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello() {
    return new Promise((resolve, reject) => {
      console.log('waiting...');
      setTimeout(() => {
        console.log('Hello gateway!');
        resolve('Hello World From Posts Service!');
      }, 2000);
    });
  }

  post() {
    this.logger.log('posts...');
  }
}
