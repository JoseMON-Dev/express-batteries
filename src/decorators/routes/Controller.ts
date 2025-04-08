import type { Container } from "inversify";
import type { Express, RequestHandler, Router } from "express";
import { type IController } from "../../types/DevpsSymbols.ts";
import {
    describeRoute,
    type DescribeRouteOptions,
} from "@camflan/valibot-openapi-generator";
import { controllerMetadata } from "../../meta/decorators/controller/controller.ts";
import { SWAGGER_DOC } from "../../meta/docs_swagger.ts";

export function Controller(
    path?: `/${string}` | undefined,
): ClassDecorator {
    return <TFunction extends Function>(target: TFunction) => {
        const router = controllerMetadata.getRouter(target);

        controllerMetadata.setPath(target, path);

        if (!router) {
            throw new Error(`Controller ${target.name} needs a route`);
        }
        const proto = target.prototype as IController;
        proto.___setUp___ = (
            app: Express,
            basePath: `/${string}`,
            container: Container,
        ) => {
            controllerMetadata.setIocContainer(target, container);
            const fullPath = `${basePath}${path ? path : ""}`;
            const routesInfo = controllerMetadata.getControllerRoutesInfo(
                target,
            );
            routesInfo.forEach((r) => {
                const p = `${fullPath}${r.path}`;
                SWAGGER_DOC.push(
                    describeRoute(p, r.routeOptions as DescribeRouteOptions),
                );
            });
            const middlewares: RequestHandler[] = controllerMetadata
                .getControllerMiddlewares(target);
            if (middlewares.length) {
                app.use(fullPath, ...middlewares);
            }

            app.use(fullPath, router);
        };
        return target;
    };
}
