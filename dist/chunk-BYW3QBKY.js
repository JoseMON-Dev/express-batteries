import {
  socketMetadata
} from "./chunk-G7YV7R2W.js";

// src/sockets/index.ts
var WebSocketGateWaySymbol = Symbol.for("WEBSOCKETGATEWAYSYMBOLIOC");
var startWebSockets = () => {
  const webSocketGateWayList = socketMetadata.getGateWayList();
  if (socketMetadata.getGateWayList().length > 0) {
    const server = socketMetadata.getServer();
    server.on("connection", async (socket) => {
      for (let i = 0; i < webSocketGateWayList.length; i++) {
        const ws = webSocketGateWayList[i];
        if (ws) {
          const instance = socketMetadata.getGateWayInstance(
            ws
          );
          if (instance.onServerConnection) {
            await instance.onServerConnection(socket, server);
          }
          const handlers = socketMetadata.getAllEventHandlers(ws);
          handlers.forEach((h) => {
            socket.on(h.event, h.handler(socket));
          });
          if (instance.onServerDisconnection) {
            socket.on("disconnect", async (msg) => {
              await instance.onServerDisconnection(
                socket,
                server
              );
            });
          }
        }
      }
    });
    return true;
  }
  return false;
};

export {
  WebSocketGateWaySymbol,
  startWebSockets
};
