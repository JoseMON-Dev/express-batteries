import { socketMetadata } from "../meta/socketMetadata";

export function WsServer(): ParameterDecorator {
    return (target, propertyKey, parameterIndex) => {
        if (target && parameterIndex >= 0 && propertyKey) {
            socketMetadata.addHandlerParameterIndex(
                target.constructor,
                propertyKey,
                parameterIndex,
                "server",
            );
        }
    };
}
