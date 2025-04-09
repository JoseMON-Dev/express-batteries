import { socketMetadata } from "../meta/socketMetadata";

export function WebSocketGateway(): ClassDecorator {
    return (target: Function) => {
        socketMetadata.setIsGateWay(target);
    };
}
