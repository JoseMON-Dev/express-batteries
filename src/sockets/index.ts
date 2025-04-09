import { socketMetadata } from "./meta/socketMetadata";
import type {
    onConnectionWebSocketGateWay,
    onDisconnectSocketGateWay,
} from "./types/webSocketGateway";
export const WebSocketGateWaySymbol = Symbol.for("WEBSOCKETGATEWAYSYMBOLIOC");

export const startWebSockets = () => {
    const webSocketGateWayList = socketMetadata.getGateWayList();

    if (socketMetadata.getGateWayList().length > 0) {
        const server = socketMetadata.getServer();

        server.on("connection", (socket) => {
            webSocketGateWayList.forEach((ws) => {
                const instance = socketMetadata.getGateWayInstance(
                    ws,
                ) as onConnectionWebSocketGateWay & onDisconnectSocketGateWay;
                instance.onServerConnection(socket, server);

                const handlers = socketMetadata.getAllEventHandlers(ws);
                handlers.forEach((h) => {
                    socket.on(h.event, h.handler(socket));
                });

                socket.on("disconnect", (msg) => {
                    instance.onServerDisconnection(socket, server, msg);
                });
            });
        });
        return true;
    }
    return false;
};

export * from "./decorators/onWebSocketEvent";
export * from "./decorators/webSocketGateway";
export * from "./decorators/webSocketServer";
export * from "./meta/socketMetadata";
export * from "./types/webSocketEventHandler";
export * from "./types/webSocketGateway";
