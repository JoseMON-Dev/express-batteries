import { socketMetadata } from "../meta/socketMetadata";

export function WsBody(): ParameterDecorator {
    return (target, propertyKey, parameterIndex) => {
        if (target && parameterIndex >= 0 && propertyKey) {
            socketMetadata.addHandlerParameterIndex(
                target.constructor,
                propertyKey,
                parameterIndex,
                "body",
            );
        }
    };
}
