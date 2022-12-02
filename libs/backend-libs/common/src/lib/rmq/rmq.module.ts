import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQConfig, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  providers: [],
  exports: [],
})
export class RmqModule {
  static register(rmqConf: Partial<RabbitMQConfig>): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
          useFactory: (configService: ConfigService) => {
            const uri =
              rmqConf.uri || configService.get<string>('RABBIT_MQ_URI');
            new Logger(RabbitMQModule.name).log('##########################    uri', uri);
            new Logger(RabbitMQModule.name).debug('##########################    config', rmqConf);

            return {
              ...rmqConf,
              uri,
            };
          },
          inject: [ConfigService],
        }),
      ],
      exports: [RabbitMQModule],
    };
  }
}
