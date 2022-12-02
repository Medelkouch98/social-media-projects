export declare type ExchangeTypes = 'topic' | 'direct' | 'fanout' | 'headers';
export interface RmqExchange {
  name: string;
  type: ExchangeTypes;
  routingKeys?: Record<string, string>;
  queues: Record<string, string>
}
