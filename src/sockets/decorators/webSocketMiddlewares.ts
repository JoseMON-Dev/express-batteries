import { socketMetadata } from "../meta/socketMetadata";
import type { WebSocketEventHandlerMiddleware } from "../types/webSocketEventHandler";

export function WsMiddlewares(
    middlewares: WebSocketEventHandlerMiddleware<any>[],
): MethodDecorator {
    return (
        target: object,
        propertyKey: string | symbol,
    ) => {
        socketMetadata.addMiddlewares(target, propertyKey, middlewares);
    };
}
