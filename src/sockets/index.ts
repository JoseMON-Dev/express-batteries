import { expressBatteriesConfig } from "../meta";
import { socketMetadata } from "./meta/socketMetadata";
import type {
    onConnectionWebSocketGateWay,
    onDisconnectSocketGateWay,
} from "./types/webSocketGateway";
export const WebSocketGateWaySymbol = Symbol.for("WEBSOCKETGATEWAYSYMBOLIOC");

export const startWebSockets = () => {
    const webSocketGateWayList = socketMetadata.getGateWayList();

    if (socketMetadata.getGateWayList().length > 0) {
        const server = expressBatteriesConfig.getSocketServer();

        server.on("connection", async (socket) => {
            for (let i = 0; i < webSocketGateWayList.length; i++) {
                const ws = webSocketGateWayList[i];
                if (ws) {
                    const instance = socketMetadata.getGateWayInstance(
                        ws,
                    ) as
                        & onConnectionWebSocketGateWay
                        & onDisconnectSocketGateWay;
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
                                server,
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

export * from "./decorators/index";
export * from "./meta/socketMetadata";
export * from "./types/index";
