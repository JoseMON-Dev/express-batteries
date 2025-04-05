import "reflect-metadata";
import { type RequestHandler, Router } from "express";
import { DECORATORS_METADATA_KEYS } from "../../decorators.metadata";
import type { OpenApiRoute } from "../../../types/openApi";
import type { Container } from "inversify";

export const controllerMetadata = {
    MIDDLEWARES: DECORATORS_METADATA_KEYS.MIDDLEWARES,
    CONTROLLER_ROUTES_INFO: DECORATORS_METADATA_KEYS.CONTROLLER_ROUTES_INFO,
    IOC_CONTAINER: DECORATORS_METADATA_KEYS.IOC_CONTAINER,
    ROUTER: DECORATORS_METADATA_KEYS.ROUTER,
    PATH: DECORATORS_METADATA_KEYS.PATH,

    getPath: (constructor: Function): string | undefined => {
        return Reflect.getMetadata(controllerMetadata.PATH, constructor);
    },

    setPath: (constructor: Function, path: `/${string}` | undefined) => {
        Reflect.defineMetadata(controllerMetadata.PATH, path, constructor);
    },

    createRouter: (constructor: Function): Router => {
        const router =
            Reflect.getMetadata(controllerMetadata.ROUTER, constructor) ||
            Router();
        Reflect.defineMetadata(controllerMetadata.ROUTER, router, constructor);
        return router;
    },

    getRouter: (constructor: Function): Router | undefined => {
        return Reflect.getMetadata(controllerMetadata.ROUTER, constructor);
    },

    setIocContainer: (constructor: Function, container: Container) => {
        Reflect.defineMetadata(
            controllerMetadata.IOC_CONTAINER,
            container,
            constructor,
        );
    },

    getIocContainer: (constructor: Function): Container | undefined => {
        return Reflect.getMetadata(
            controllerMetadata.IOC_CONTAINER,
            constructor,
        );
    },

    addControllerMiddleware: (
        target: Function | object,
        middlewares: RequestHandler[],
    ) => {
        Reflect.defineMetadata(
            controllerMetadata.MIDDLEWARES,
            middlewares,
            target,
        );
    },

    getControllerMiddlewares: (
        target: Function | object,
    ): RequestHandler[] => {
        return Reflect.getMetadata(
            controllerMetadata.MIDDLEWARES,
            target,
        ) || [];
    },

    addRouteInfoToController: (
        constructor: Function,
        routeInfo: OpenApiRoute | undefined,
    ) => {
        const controllerRoutesInfo = Reflect.getMetadata(
            controllerMetadata.CONTROLLER_ROUTES_INFO,
            constructor,
        ) || [];

        controllerRoutesInfo.push(routeInfo);
        Reflect.defineMetadata(
            controllerMetadata.CONTROLLER_ROUTES_INFO,
            controllerRoutesInfo,
            constructor,
        );
    },

    getControllerRoutesInfo: (constructor: Function) => {
        const controllerRoutesInfo = Reflect.getMetadata(
            controllerMetadata.CONTROLLER_ROUTES_INFO,
            constructor,
        ) || [];

        return controllerRoutesInfo as OpenApiRoute[];
    },
};
