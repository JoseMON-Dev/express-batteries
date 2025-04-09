import "reflect-metadata";
import { expressBatteriesConfig } from "../../meta/config";
import { Container } from "inversify";
import type { WebSocketEventHandler } from "../types/webSocketEventHandler";

const webSocketGateWayList: Function[] = [];

export const socketMetadata = {
    EVENT: "ws:event",
    GATEWAY_INSTANCE: "ws:Gateway",
    IOC_CONTAINER: "ws:IOC_Container",
    SERVER_PARAMETER_INDEX: "ws:class:server:parameterKey",
    DEPENDENCIES_LEN: "ws:dep_len",
    HANDLERS: "ws:handlers",
    IS_GATEWAY: "ws:isgateWay",

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

    addDependency: (
        target: object,
        propertyKey: string | symbol,
        numberOfDependencies: number,
    ) => {
        const currentSize = socketMetadata.getDependenciesSize(
            target,
            propertyKey,
        );

        Reflect.defineMetadata(
            socketMetadata.DEPENDENCIES_LEN,
            currentSize + numberOfDependencies,
            target,
            propertyKey,
        );
    },

    getDependenciesSize: (
        target: object,
        propertyKey: string | symbol,
    ): number => {
        return Reflect.getMetadata(
            socketMetadata.DEPENDENCIES_LEN,
            target,
            propertyKey,
        ) || 0;
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

    getServer: () => {
        return expressBatteriesConfig.getSocketServer();
    },

    setServerParameterIndex: (
        target: object,
        propertyKey: string | symbol,
        parameterIndex: number,
    ) => {
        Reflect.defineMetadata(
            socketMetadata.SERVER_PARAMETER_INDEX,
            parameterIndex,
            target,
            propertyKey,
        );
        socketMetadata.addDependency(target, propertyKey, 1);
    },

    getServerParameterIndex: (
        target: object,
        propertyKey: string | symbol,
    ): number | undefined => {
        return Reflect.getMetadata(
            socketMetadata.SERVER_PARAMETER_INDEX,
            target,
            propertyKey,
        );
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
