export { OnWsEvent } from './decorators/onWebSocketEvent.cjs';
export { WsGateway } from './decorators/webSocketGateway.cjs';
export { WsServer } from './decorators/webSocketServer.cjs';
export { WsBody } from './decorators/webSocketBody.cjs';
export { WsSocket } from './decorators/webSocketParam.cjs';
export { WsMiddlewares } from './decorators/webSocketMiddlewares.cjs';
export { socketMetadata } from './meta/socketMetadata.cjs';
export { SocketsMap, WebSocketsServer } from './types/index.cjs';
export { Context, WebSocketEventHandler, WebSocketEventHandlerMiddleware } from './types/webSocketEventHandler.cjs';
export { onConnectionWebSocketGateWay, onDisconnectSocketGateWay } from './types/webSocketGateway.cjs';
export { WsHandlerParams } from './types/webSocketHandlerParams.cjs';
import 'inversify';
import 'socket.io';

declare const WebSocketGateWaySymbol: unique symbol;
declare const startWebSockets: () => boolean;

export { WebSocketGateWaySymbol, startWebSockets };
