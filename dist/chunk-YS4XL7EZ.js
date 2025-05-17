import {
  socketMetadata
} from "./chunk-KUDJHQNN.js";

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
