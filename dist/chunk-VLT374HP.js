import {
  socketMetadata
} from "./chunk-G7YV7R2W.js";

// src/sockets/decorators/webSocketGateway.ts
function WsGateway() {
  return (target) => {
    socketMetadata.setIsGateWay(target);
  };
}

export {
  WsGateway
};
