import * as socket_io from 'socket.io';
import { Container } from 'inversify';
import { WebSocketEventHandlerMiddleware, WebSocketEventHandler } from '../types/webSocketEventHandler.js';
import { WsHandlerParams } from '../types/webSocketHandlerParams.js';

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
    getServer: () => socket_io.Server<socket_io.DefaultEventsMap, socket_io.DefaultEventsMap, socket_io.DefaultEventsMap, any>;
    addHandlerParameterIndex: (constructor: Function, propertyKey: string | symbol, parameterIndex: number, wsHandlerParam: WsHandlerParams) => void;
    getParameterIndexDict: (target: Function) => Map<string | symbol, Map<WsHandlerParams, number>>;
    getAllEventHandlers: (constructor: Function) => WebSocketEventHandler[];
    addEventHandler: (handler: WebSocketEventHandler, constructor: Function) => void;
};

export { socketMetadata };
