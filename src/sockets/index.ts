import { expressBatteriesConfig } from "../meta";
import { socketMetadata } from "./meta/socketMetadata";
import type { WebSocketAdapterGenerator } from "./types/index";
import type {
    onConnectionWebSocketGateWay,
    onDisconnectSocketGateWay,
} from "./types/webSocketGateway";
export const WebSocketGateWaySymbol = Symbol.for("WEBSOCKETGATEWAYSYMBOLIOC");

export const startWebSockets = async (
    wsAdapterGenerator: undefined | WebSocketAdapterGenerator = undefined,
) => {
    const webSocketGateWayList = socketMetadata.getGateWayList();
    const server = expressBatteriesConfig.getSocketServer();

    if (socketMetadata.getGateWayList().length > 0) {
        if (wsAdapterGenerator) {
            const adapter = await wsAdapterGenerator();
            server.adapter(adapter);
        }
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
