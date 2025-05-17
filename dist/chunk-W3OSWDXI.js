import {
  socketMetadata
} from "./chunk-G7YV7R2W.js";

// src/sockets/decorators/webSocketMiddlewares.ts
function WsMiddlewares(middlewares) {
  return (target, propertyKey) => {
    socketMetadata.addMiddlewares(target, propertyKey, middlewares);
  };
}

export {
  WsMiddlewares
};
