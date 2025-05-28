import "reflect-metadata";
import { expressBatteriesConfig } from "../../meta/config";
import { Container } from "inversify";
import type {
    WebSocketEventHandler,
    WebSocketEventHandlerMiddleware,
} from "../types/webSocketEventHandler";
import type { WsHandlerParams } from "../types/webSocketHandlerParams";

const webSocketGateWayList: Function[] = [];

export const socketMetadata = {
    EVENT: "ws:event",
    GATEWAY_INSTANCE: "ws:Gateway",
    IOC_CONTAINER: "ws:IOC_Container",
    PARAMETERS_INDEX_DICT: "ws:class:server:parameterKey",
    HANDLERS: "ws:handlers",
    MIDDLEWARES: "ws:middlewares:fn",
    IS_GATEWAY: "ws:isgateWay",

    addMiddlewares: (
        target: object,
        propertyKey: string | symbol,
        list: WebSocketEventHandlerMiddleware<unknown>[],
    ) => {
        Reflect.defineMetadata(
            socketMetadata.MIDDLEWARES,
            list,
            target,
            propertyKey,
        );
    },

    getMiddlewaresList: (target: object, propertyKey: string | symbol) => {
        const middlewares = Reflect.getMetadata(
            socketMetadata.MIDDLEWARES,
            target,
            propertyKey,
        ) || [];
        return middlewares as WebSocketEventHandlerMiddleware<unknown>[];
    },

    setIsGateWay: (constructor: Function) => {
        Reflect.defineMetadata(socketMetadata.IS_GATEWAY, true, constructor);
    },

    isGateWay: (constructor: Function) => {
        return Reflect.getMetadata(socketMetadata.IS_GATEWAY, constructor) ||
            false;
    },

    addGateWay: (constructor: Function) => {
        webSocketGateWayList.push(constructor);
    },

    getGateWayList: () => {
        return webSocketGateWayList;
    },

    setIOCContainer: (constructor: Function, container: Container) => {
        Reflect.defineMetadata(
            socketMetadata.IOC_CONTAINER,
            container,
            constructor,
        );
    },

    getIOCContainer: (constructor: Function): Container | undefined => {
        return Reflect.getMetadata(
            socketMetadata.IOC_CONTAINER,
            constructor,
        );
    },

    getGateWayInstance: (constructor: Function): object | undefined => {
        const container = socketMetadata.getIOCContainer(constructor);
        const gateWay = Reflect.getMetadata(
                socketMetadata.GATEWAY_INSTANCE,
                constructor,
            ) ||
                container !== undefined
            ? container?.get(
                Symbol.for(constructor.name),
            )
            : undefined;
        Reflect.defineMetadata(
            socketMetadata.GATEWAY_INSTANCE,
            gateWay,
            constructor,
        );
        return gateWay as object;
    },

    

    addHandlerParameterIndex: (
        constructor: Function,
        propertyKey: string | symbol,
        parameterIndex: number,
        wsHandlerParam: WsHandlerParams,
    ) => {
        const map = socketMetadata.getParameterIndexDict(constructor);
        const props = map.get(propertyKey) ||
            new Map<WsHandlerParams, number>();
        props.set(wsHandlerParam, parameterIndex);
        map.set(propertyKey, props);
    },

    getParameterIndexDict: (
        target: Function,
    ): Map<string | symbol, Map<WsHandlerParams, number>> => {
        const map = Reflect.getMetadata(
            socketMetadata.PARAMETERS_INDEX_DICT,
            target,
        ) || new Map();
        Reflect.defineMetadata(
            socketMetadata.PARAMETERS_INDEX_DICT,
            map,
            target,
        );
        return map;
    },

    getAllEventHandlers: (constructor: Function): WebSocketEventHandler[] => {
        return Reflect.getMetadata(socketMetadata.HANDLERS, constructor) || [];
    },

    addEventHandler: (
        handler: WebSocketEventHandler,
        constructor: Function,
    ) => {
        const handlers = socketMetadata.getAllEventHandlers(constructor);
        Reflect.defineMetadata(
            socketMetadata.HANDLERS,
            [...handlers, handler],
            constructor,
        );
    },
};
