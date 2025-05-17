import { WebSocketEventHandlerMiddleware } from '../types/webSocketEventHandler.cjs';
import 'socket.io';

declare function WsMiddlewares(middlewares: WebSocketEventHandlerMiddleware<any>[]): MethodDecorator;

export { WsMiddlewares };
