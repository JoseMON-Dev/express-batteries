import {
  socketMetadata
} from "./chunk-VQ5JRWOW.js";

// src/sockets/decorators/webSocketParam.ts
function WsSocket() {
  return (target, propertyKey, parameterIndex) => {
    if (target && parameterIndex >= 0 && propertyKey) {
      socketMetadata.addHandlerParameterIndex(
        target.constructor,
        propertyKey,
        parameterIndex,
        "socket"
      );
    }
  };
}

export {
  WsSocket
};
