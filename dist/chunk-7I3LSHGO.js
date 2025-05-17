import {
  socketMetadata
} from "./chunk-G7YV7R2W.js";

// src/sockets/decorators/webSocketServer.ts
function WsServer() {
  return (target, propertyKey, parameterIndex) => {
    if (target && parameterIndex >= 0 && propertyKey) {
      socketMetadata.addHandlerParameterIndex(
        target.constructor,
        propertyKey,
        parameterIndex,
        "server"
      );
    }
  };
}

export {
  WsServer
};
