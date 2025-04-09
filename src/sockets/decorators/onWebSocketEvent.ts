import type { Socket } from "socket.io";
import { socketMetadata } from "../meta/socketMetadata";
import type { WsHandlerParams } from "../types/webSocketHandlerParams";
import { insertAtIndex } from "../../functions";

export function OnWsEvent(
    event: Exclude<string, "connection" | "disconnect">,
): MethodDecorator {
    return (
        target: object,
        propertyKey: string | symbol,
    ) => {
        const dependencyIndexDict = socketMetadata.getParameterIndexDict(
            target.constructor,
        );
        const indexesMap = dependencyIndexDict.get(propertyKey) ||
            new Map<WsHandlerParams, number>();

        const server = socketMetadata.getServer();
        const handlerParams = new Map<WsHandlerParams, any>();
        handlerParams.set("server", server);
        const dependencyArray: any[] = [];
        const middlewares = socketMetadata.getMiddlewaresList(
            target,
            propertyKey,
        );

        const fnHandler = (socket: Socket) => async (initialBody: any) => {
            const context = { body: initialBody };

            handlerParams.set("body", context.body);
            handlerParams.set("socket", socket);

            const fn = (target as Record<string | symbol, Function>)[
                propertyKey
            ] as Function;

            const socketGateWayInstance = socketMetadata.getGateWayInstance(
                target.constructor,
            );
            const handler = fn.bind(socketGateWayInstance);

            let next: () => Promise<void> = async () => {
                handlerParams.set("body", context.body);
                for (const [paramName, index] of indexesMap) {
                    insertAtIndex(
                        dependencyArray,
                        index,
                        handlerParams.get(paramName),
                        true,
                    );
                }
                await handler(...dependencyArray);
            };

            for (let i = middlewares.length - 1; i >= 0; i--) {
                const current = middlewares[i];
                if (!current) {
                    throw new Error(
                        "Invalid middleware found undefined at run event " +
                            event,
                    );
                }
                const prevNext = next;

                next = async () => {
                    await current(
                        server,
                        socket,
                        context,
                        prevNext,
                    );
                };
            }

            await next();
        };

        socketMetadata.addEventHandler({
            event,
            handler: fnHandler,
        }, target.constructor);
    };
}
