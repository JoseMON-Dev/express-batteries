import {
  socketMetadata
} from "./chunk-KUDJHQNN.js";

// src/sockets/decorators/webSocketMiddlewares.ts
function WsMiddlewares(middlewares) {
  return (target, propertyKey) => {
    socketMetadata.addMiddlewares(target, propertyKey, middlewares);
  };
}

export {
  WsMiddlewares
};
