import type {
    NextFunction,
    Request,
    RequestHandler,
    Response,
    Router,
} from "express";
import type {
    HttpMethodsExpress,
    OpenApiHttpMethods,
} from "../../types/httpMethods";
import type { DescribeRouteOptions } from "../../types/openApi";
import { routeMetadata } from "../../meta/decorators/route/route";
import { descriptionHttpCode } from "../../meta/httpCodes";
import { controllerMetadata } from "../../meta/decorators/controller/controller";
import { iocMetadata } from "../../meta/decorators/ioc";

const createRouteDecorator = (
    method: OpenApiHttpMethods | HttpMethodsExpress,
) => {
    return function (
        path: `/${string}` | "/",
        props?: Omit<Omit<DescribeRouteOptions, "method">, "responses">,
    ): MethodDecorator {
        return function (
            target: Record<string | symbol, any>,
            propertyKey: string | symbol,
            descriptor,
        ) {
            console.log(descriptor);
            const fn: Function = target[propertyKey];
            const handler = fn.bind(target);
            const middlewares: RequestHandler[] = routeMetadata
                .getRouteMiddlewares(
                    target,
                    propertyKey,
                );

            const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
                target,
                propertyKey,
            );

            if (routesOpenApiInfo) {
                routeMetadata.saveRoutesOpenApiInfo(
                    {
                        ...routesOpenApiInfo,
                        path: path,
                        routeOptions: {
                            ...routesOpenApiInfo.routeOptions,
                            method: method.toUpperCase() as OpenApiHttpMethods,
                            responses: {
                                500: {
                                    description: descriptionHttpCode[500],
                                },
                                ...routesOpenApiInfo.routeOptions?.responses,
                            },
                            ...props,
                        },
                    },
                    target,
                    propertyKey,
                );
            } else {
                routeMetadata.saveRoutesOpenApiInfo(
                    {
                        path: path,
                        routeOptions: {
                            method: method.toUpperCase() as OpenApiHttpMethods,
                            responses: {
                                500: {
                                    description: descriptionHttpCode[400],
                                },
                            },
                        },
                        ...props,
                    },
                    target,
                    propertyKey,
                );
            }

            controllerMetadata.addRouteInfoToController(
                target.constructor,
                routeMetadata.getRoutesOpenApiInfo(target, propertyKey),
            );

            const router: Router = controllerMetadata.createRouter(
                target.constructor,
            );
            router[method.toLowerCase() as HttpMethodsExpress](
                path,
                ...middlewares,
                async (
                    req: Request,
                    res: Response,
                    next: NextFunction,
                ) => {
                    try {
                        const dependencies = iocMetadata.getAllDependencies(
                            target,
                            propertyKey,
                        );
                        const container = controllerMetadata
                            .getIocContainer(target.constructor);
                        if (!container) {
                            throw new Error(
                                "Container not found. Please add it to the controller " +
                                    target.constructor.name,
                            );
                        }
                        const params: unknown[] = new Array(
                            dependencies.length + 2,
                        );

                        params[0] = req;
                        params[1] = res;
                        for (let i = 0; i < dependencies.length; i++) {
                            const param = dependencies[i];
                            if (param) {
                                const resolvedParam = container.get(
                                    param.dependencySymbol,
                                    param.options,
                                );
                                params[param.index] = resolvedParam;
                            }
                        }

                        await handler(...params);
                    } catch (error) {
                        next(error);
                    }
                },
            );
        };
    };
};

export const Get = createRouteDecorator("GET");
export const Post = createRouteDecorator("POST");
export const Put = createRouteDecorator("PUT");
export const Delete = createRouteDecorator("DELETE");
export const Patch = createRouteDecorator("PATCH");
export const Head = createRouteDecorator("HEAD");
export const Options = createRouteDecorator("OPTIONS");
export const Trace = createRouteDecorator("TRACE");
