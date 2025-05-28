import { Container } from 'inversify';
import { WebSocketEventHandlerMiddleware, WebSocketEventHandler } from '../types/webSocketEventHandler.js';
import { WsHandlerParams } from '../types/webSocketHandlerParams.js';
import 'socket.io';

declare const socketMetadata: {
    EVENT: string;
    GATEWAY_INSTANCE: string;
    IOC_CONTAINER: string;
    PARAMETERS_INDEX_DICT: string;
    HANDLERS: string;
    MIDDLEWARES: string;
    IS_GATEWAY: string;
    addMiddlewares: (target: object, propertyKey: string | symbol, list: WebSocketEventHandlerMiddleware<unknown>[]) => void;
    getMiddlewaresList: (target: object, propertyKey: string | symbol) => WebSocketEventHandlerMiddleware<unknown>[];
    setIsGateWay: (constructor: Function) => void;
    isGateWay: (constructor: Function) => any;
    addGateWay: (constructor: Function) => void;
    getGateWayList: () => Function[];
    setIOCContainer: (constructor: Function, container: Container) => void;
    getIOCContainer: (constructor: Function) => Container | undefined;
    getGateWayInstance: (constructor: Function) => object | undefined;
    addHandlerParameterIndex: (constructor: Function, propertyKey: string | symbol, parameterIndex: number, wsHandlerParam: WsHandlerParams) => void;
    getParameterIndexDict: (target: Function) => Map<string | symbol, Map<WsHandlerParams, number>>;
    getAllEventHandlers: (constructor: Function) => WebSocketEventHandler[];
    addEventHandler: (handler: WebSocketEventHandler, constructor: Function) => void;
};

export { socketMetadata };
