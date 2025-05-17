import {
  socketMetadata
} from "./chunk-KUDJHQNN.js";

// src/sockets/decorators/webSocketGateway.ts
function WsGateway() {
  return (target) => {
    socketMetadata.setIsGateWay(target);
  };
}

export {
  WsGateway
};
