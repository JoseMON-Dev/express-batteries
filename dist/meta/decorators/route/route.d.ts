import * as qs from 'qs';
import * as express_serve_static_core from 'express-serve-static-core';
import { RequestHandler } from 'express';
import { OpenApiRoute } from '../../../types/openApi.js';
import 'openapi-types';
import 'valibot';

declare const routeMetadata: {
    MIDDLEWARES: "router:middlewares";
    OPEN_API_INFO: "openapi:routesOpenApiInfo";
    saveRoutesOpenApiInfo: (metadata: OpenApiRoute, target: Record<string | symbol, unknown> | object, propertyKey: string | symbol) => void;
    getRoutesOpenApiInfo: (target: Record<string | symbol, unknown> | object, propertyKey: string | symbol) => OpenApiRoute | undefined;
    getRouteMiddlewares: (target: object, propertyKey: string | symbol) => RequestHandler<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>[];
    addRouteMiddleware: (target: object, propertyKey: string | symbol, middleware?: RequestHandler) => RequestHandler<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>[];
};

export { routeMetadata };
