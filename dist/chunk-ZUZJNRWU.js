import {
  controllerMetadata
} from "./chunk-RORZUQNO.js";
import {
  routeMetadata
} from "./chunk-4M4IRHAX.js";
import {
  iocMetadata
} from "./chunk-MI3YJG7I.js";
import {
  descriptionHttpCode
} from "./chunk-2WIR5VWA.js";

// src/decorators/routes/Route.ts
var createRouteDecorator = (method) => {
  return function(path, props) {
    return function(target, propertyKey, descriptor) {
      const handler = target[propertyKey];
      const middlewares = routeMetadata.getRouteMiddlewares(
        target,
        propertyKey
      ).reverse();
      const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
        target,
        propertyKey
      );
      if (routesOpenApiInfo) {
        routeMetadata.saveRoutesOpenApiInfo(
          {
            ...routesOpenApiInfo,
            path,
            routeOptions: {
              ...routesOpenApiInfo.routeOptions,
              method: method.toUpperCase(),
              responses: {
                500: {
                  description: descriptionHttpCode[500]
                },
                ...routesOpenApiInfo.routeOptions?.responses
              },
              ...props
            }
          },
          target,
          propertyKey
        );
      } else {
        routeMetadata.saveRoutesOpenApiInfo(
          {
            path,
            routeOptions: {
              method: method.toUpperCase(),
              responses: {
                500: {
                  description: descriptionHttpCode[400]
                }
              },
              ...props
            }
          },
          target,
          propertyKey
        );
      }
      controllerMetadata.addRouteInfoToController(
        target.constructor,
        routeMetadata.getRoutesOpenApiInfo(target, propertyKey)
      );
      const router = controllerMetadata.createRouter(
        target.constructor
      );
      router[method.toLowerCase()](
        path,
        ...middlewares,
        async (req, res, next) => {
          try {
            const dependencies = iocMetadata.getAllDependencies(
              target,
              propertyKey
            );
            const container = controllerMetadata.getIocContainer(target.constructor);
            if (!container) {
              throw new Error(
                "Container not found. Please add it to the controller " + target.constructor.name
              );
            }
            const params = new Array(
              dependencies.length + 2
            );
            params[0] = req;
            params[1] = res;
            for (let i = 0; i < dependencies.length; i++) {
              const param = dependencies[i];
              if (param) {
                const resolvedParam = container.get(
                  param.dependencySymbol,
                  param.options
                );
                params[param.index] = resolvedParam;
              }
            }
            const controllerInstance = controllerMetadata.getControllerInstance(
              target.constructor
            );
            const fn = handler.bind(controllerInstance);
            await fn(...params);
          } catch (error) {
            next(error);
          }
        }
      );
    };
  };
};
var Get = createRouteDecorator("GET");
var Post = createRouteDecorator("POST");
var Put = createRouteDecorator("PUT");
var Delete = createRouteDecorator("DELETE");
var Patch = createRouteDecorator("PATCH");
var Head = createRouteDecorator("HEAD");
var Options = createRouteDecorator("OPTIONS");
var Trace = createRouteDecorator("TRACE");

export {
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Head,
  Options,
  Trace
};
