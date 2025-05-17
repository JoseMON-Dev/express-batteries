import { WebSocketEventHandlerMiddleware } from '../types/webSocketEventHandler.js';
import 'socket.io';

declare function WsMiddlewares(middlewares: WebSocketEventHandlerMiddleware<any>[]): MethodDecorator;

export { WsMiddlewares };
