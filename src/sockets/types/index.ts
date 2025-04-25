import type { DefaultEventsMap, Socket } from "socket.io";

export * from "./webSocketEventHandler";
export * from "./webSocketGateway";
export * from "./webSocketHandlerParams";
export type SocketsMap = Map<
    string,
    Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
>;
export const WebSocketsServer = "6b376b734d980df4c233";
