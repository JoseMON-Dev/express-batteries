export { OnWsEvent } from './decorators/onWebSocketEvent.js';
export { WsGateway } from './decorators/webSocketGateway.js';
export { WsServer } from './decorators/webSocketServer.js';
export { WsBody } from './decorators/webSocketBody.js';
export { WsSocket } from './decorators/webSocketParam.js';
export { WsMiddlewares } from './decorators/webSocketMiddlewares.js';
export { socketMetadata } from './meta/socketMetadata.js';
export { SocketsMap, WebSocketsServer } from './types/index.js';
export { Context, WebSocketEventHandler, WebSocketEventHandlerMiddleware } from './types/webSocketEventHandler.js';
export { onConnectionWebSocketGateWay, onDisconnectSocketGateWay } from './types/webSocketGateway.js';
export { WsHandlerParams } from './types/webSocketHandlerParams.js';
import 'socket.io';
import 'inversify';

declare const WebSocketGateWaySymbol: unique symbol;
declare const startWebSockets: () => boolean;

export { WebSocketGateWaySymbol, startWebSockets };
