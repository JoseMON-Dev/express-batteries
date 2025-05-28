import type { DefaultEventsMap, Socket } from "socket.io";

import { Adapter } from "socket.io-adapter";
import type { Namespace } from "socket.io";
export * from "./webSocketEventHandler";
export * from "./webSocketGateway";
export * from "./webSocketHandlerParams";
export type SocketsMap = Map<
    string,
    Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
>;
type AdapterConstructor = typeof Adapter | ((nsp: Namespace) => Adapter);
export const WebSocketsServer = "6b376b734d980df4c233";
export type WebSocketAdapterGenerator = () => Promise<AdapterConstructor>;
