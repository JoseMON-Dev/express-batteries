import { Socket, DefaultEventsMap } from 'socket.io';
export { Context, WebSocketEventHandler, WebSocketEventHandlerMiddleware } from './webSocketEventHandler.cjs';
export { onConnectionWebSocketGateWay, onDisconnectSocketGateWay } from './webSocketGateway.cjs';
export { WsHandlerParams } from './webSocketHandlerParams.cjs';

type SocketsMap = Map<string, Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>>;
declare const WebSocketsServer = "6b376b734d980df4c233";

export { type SocketsMap, WebSocketsServer };
