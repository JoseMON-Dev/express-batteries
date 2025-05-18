import {
  socketMetadata
} from "./chunk-VQ5JRWOW.js";

// src/sockets/decorators/webSocketGateway.ts
function WsGateway() {
  return (target) => {
    socketMetadata.setIsGateWay(target);
  };
}

export {
  WsGateway
};
