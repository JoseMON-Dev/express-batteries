import { type RequestHandler, Router } from "express";
import { DECORATORS_METADATA_KEYS } from "../../decorators.metadata";
import type { OpenApiRoute } from "../../../types/openApi";

export const routeMetadata = {
    MIDDLEWARES: DECORATORS_METADATA_KEYS.MIDDLEWARES,
    OPEN_API_INFO: DECORATORS_METADATA_KEYS.ROUTES_OPENAPI_INFO,

    saveRoutesOpenApiInfo: (
        metadata: OpenApiRoute,
        target: Record<string | symbol, unknown> | object,
        propertyKey: string | symbol,
    ) => {
        Reflect.defineMetadata(
            routeMetadata.OPEN_API_INFO,
            metadata,
            target,
            propertyKey,
        );
    },

    getRoutesOpenApiInfo: (
        target: Record<string | symbol, unknown> | object,
        propertyKey: string | symbol,
    ): OpenApiRoute | undefined => {
        return Reflect.getMetadata(
            routeMetadata.OPEN_API_INFO,
            target,
            propertyKey,
        );
    },

    getRouteMiddlewares: (target: object, propertyKey: string | symbol) => {
        return routeMetadata.addRouteMiddleware(target, propertyKey);
    },

    addRouteMiddleware: (
        target: object,
        propertyKey: string | symbol,
        middleware?: RequestHandler,
    ) => {
        let middlewares: RequestHandler[] = Reflect.getMetadata(
            routeMetadata.MIDDLEWARES,
            target,
            propertyKey,
        );

        if (!middlewares) {
            middlewares = [] as RequestHandler[];
        }

        if (!middleware) {
            return middlewares;
        }

        Reflect.defineMetadata(
            routeMetadata.MIDDLEWARES,
            [...middlewares, middleware],
            target,
            propertyKey,
        );
        return [...middlewares, middleware];
    },
};
