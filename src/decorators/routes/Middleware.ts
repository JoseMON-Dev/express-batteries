import type { RequestHandler } from "express";
import { routeMetadata } from "../../meta/decorators/route/route";
import { controllerMetadata } from "../../meta/decorators/controller/controller";

export function Middleware(middleware: RequestHandler): MethodDecorator {
    return (target: object, propertyKey: string | symbol) => {
        routeMetadata.addRouteMiddleware(target, propertyKey, middleware);
    };
}

export function Middlewares(
    ...middlewares: RequestHandler[]
): ClassDecorator | MethodDecorator {
    return (target: object, propertyKey?: string | symbol) => {
        if (propertyKey) {
            middlewares.forEach((middleware) => {
                routeMetadata.addRouteMiddleware(
                    target,
                    propertyKey,
                    middleware,
                );
            });
        } else {
            controllerMetadata.addControllerMiddleware(target, middlewares);
        }
    };
}
