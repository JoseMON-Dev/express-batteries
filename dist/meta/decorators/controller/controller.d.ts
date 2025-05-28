import { Router, RequestHandler } from 'express';
import { OpenApiRoute } from '../../../types/openApi.js';
import { Container } from 'inversify';
import 'openapi-types';
import 'valibot';

declare const controllerMetadata: {
    MIDDLEWARES: "router:middlewares";
    CONTROLLER_ROUTES_INFO: "openapi:controllerRoutesInfo";
    IOC_CONTAINER: "IOC:iocContainer";
    ROUTER: "router:router";
    PATH: "router:path";
    INSTANCE: "controller:instance";
    getPath: (constructor: Function) => string | undefined;
    setPath: (constructor: Function, path: `/${string}` | undefined) => void;
    createRouter: (constructor: Function) => Router;
    getControllerInstance: (constructor: Function) => object;
    getRouter: (constructor: Function) => Router | undefined;
    setIocContainer: (constructor: Function, container: Container) => void;
    getIocContainer: (constructor: Function) => Container | undefined;
    addControllerMiddleware: (target: Function | object, middlewares: RequestHandler[]) => void;
    getControllerMiddlewares: (target: Function | object) => RequestHandler[];
    addRouteInfoToController: (constructor: Function, routeInfo: OpenApiRoute | undefined) => void;
    getControllerRoutesInfo: (constructor: Function) => OpenApiRoute[];
};

export { controllerMetadata };
