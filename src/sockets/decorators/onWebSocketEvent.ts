import type { Socket } from "socket.io";
import { socketMetadata } from "../meta/socketMetadata";

export function OnWebSocketEvent(
    event: Exclude<string, "connection" | "disconnect">,
): MethodDecorator {
    return (
        target: Record<string | symbol, any>,
        propertyKey: string | symbol,
    ) => {
        const fnHandler = (socket: Socket) => async (msg: any) => {
            const fn = target[propertyKey] as Function;
            const dependencyArray = new Array(
                socketMetadata.getDependenciesSize(target, propertyKey),
            );
            const server = socketMetadata.getServer();
            const serverParameterIndex = socketMetadata.getServerParameterIndex(
                target,
                propertyKey,
            );
            const socketGateWayInstance = socketMetadata.getGateWayInstance(
                target.constructor,
            );
            const handler = fn.bind(socketGateWayInstance);

            for (let i = 0; i < dependencyArray.length; i++) {
                if (i === serverParameterIndex) {
                    dependencyArray[i] = server;
                }
            }

            await handler(...dependencyArray);
        };

        socketMetadata.addEventHandler({
            event,
            handler: fnHandler,
        }, target.constructor);
    };
}
