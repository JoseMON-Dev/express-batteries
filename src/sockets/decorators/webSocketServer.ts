import { socketMetadata } from "../meta/socketMetadata";

export function WebSocketServer(): ParameterDecorator {
    return (target, propertyKey, parameterIndex) => {
        if (target && parameterIndex >= 0 && propertyKey) {
            socketMetadata.setServerParameterIndex(
                target,
                propertyKey,
                parameterIndex,
            );
        }
    };
}
