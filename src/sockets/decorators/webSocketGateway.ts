import { socketMetadata } from "../meta/socketMetadata";

export function WsGateway(): ClassDecorator {
    return (target: Function) => {
        socketMetadata.setIsGateWay(target);
    };
}
