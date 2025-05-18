import {
  socketMetadata
} from "./chunk-VQ5JRWOW.js";

// src/sockets/decorators/webSocketBody.ts
function WsBody() {
  return (target, propertyKey, parameterIndex) => {
    if (target && parameterIndex >= 0 && propertyKey) {
      socketMetadata.addHandlerParameterIndex(
        target.constructor,
        propertyKey,
        parameterIndex,
        "body"
      );
    }
  };
}

export {
  WsBody
};
