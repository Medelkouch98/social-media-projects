import { RmqExchange } from "../models";

export const RMQ_EXCHANGES: Record<string, RmqExchange> = {
  main: {
    name: "main",
    type: "topic",
    queues: {
      auth_rpc_login: "auth_rpc_login",
    },
    routingKeys: {
      auth_rpc_login: "auth_rpc_login",
    }
  }
};
