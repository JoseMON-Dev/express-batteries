import { Socket, DefaultEventsMap } from 'socket.io';
export { Context, WebSocketEventHandler, WebSocketEventHandlerMiddleware } from './webSocketEventHandler.js';
export { onConnectionWebSocketGateWay, onDisconnectSocketGateWay } from './webSocketGateway.js';
export { WsHandlerParams } from './webSocketHandlerParams.js';

type SocketsMap = Map<string, Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>>;
declare const WebSocketsServer = "6b376b734d980df4c233";

export { type SocketsMap, WebSocketsServer };
