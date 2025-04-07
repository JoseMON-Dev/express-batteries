"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/decorators/routes/Route.ts
var Route_exports = {};
__export(Route_exports, {
  Delete: () => Delete,
  Get: () => Get,
  Head: () => Head,
  Options: () => Options,
  Patch: () => Patch,
  Post: () => Post,
  Put: () => Put,
  Trace: () => Trace
});
module.exports = __toCommonJS(Route_exports);

// src/meta/decorators/route/route.ts
var import_reflect_metadata = require("reflect-metadata");
var import_express = require("express");

// src/meta/decorators.metadata.ts
var DECORATORS_METADATA_KEYS = {
  BODY: "router:body",
  PARAMS: "router:params",
  QUERIES: "router:queries",
  MIDDLEWARES: "router:middlewares",
  PATH: "router:path",
  ROUTER: "router:router",
  HAVE_VALIDATION: "router:haveValidation",
  ROUTES_OPENAPI_INFO: "openapi:routesOpenApiInfo",
  CONTROLLER_ROUTES_INFO: "openapi:controllerRoutesInfo",
  ROUTE_RESPONSE: "openapi:routeResponse",
  IOC_CONTAINER_KEYS: "IOC:iocContainerKeys",
  IOC_CONTAINER: "IOC:iocContainer",
  IOC_CONTROLLER_INSTANCE: "controller:instance"
};

// src/meta/decorators/route/route.ts
var routeMetadata = {
  MIDDLEWARES: DECORATORS_METADATA_KEYS.MIDDLEWARES,
  OPEN_API_INFO: DECORATORS_METADATA_KEYS.ROUTES_OPENAPI_INFO,
  saveRoutesOpenApiInfo: (metadata, target, propertyKey) => {
    Reflect.defineMetadata(
      routeMetadata.OPEN_API_INFO,
      metadata,
      target,
      propertyKey
    );
  },
  getRoutesOpenApiInfo: (target, propertyKey) => {
    return Reflect.getMetadata(
      routeMetadata.OPEN_API_INFO,
      target,
      propertyKey
    );
  },
  getRouteMiddlewares: (target, propertyKey) => {
    return routeMetadata.addRouteMiddleware(target, propertyKey);
  },
  addRouteMiddleware: (target, propertyKey, middleware) => {
    let middlewares = Reflect.getMetadata(
      routeMetadata.MIDDLEWARES,
      target,
      propertyKey
    );
    if (!middlewares) {
      middlewares = [];
    }
    if (!middleware) {
      return middlewares;
    }
    Reflect.defineMetadata(
      routeMetadata.MIDDLEWARES,
      [...middlewares, middleware],
      target,
      propertyKey
    );
    return [...middlewares, middleware];
  }
};

// src/meta/httpCodes.ts
var descriptionHttpCode = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  204: "No Content",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  409: "Conflict",
  500: "Internal Server Error",
  501: "Not Implemented"
};

// src/meta/decorators/controller/controller.ts
var import_reflect_metadata2 = require("reflect-metadata");
var import_express2 = require("express");

// src/types/DevpsSymbols.ts
var ControllerSymbol = Symbol.for("Controller");

// src/meta/decorators/controller/controller.ts
var controllerMetadata = {
  MIDDLEWARES: DECORATORS_METADATA_KEYS.MIDDLEWARES,
  CONTROLLER_ROUTES_INFO: DECORATORS_METADATA_KEYS.CONTROLLER_ROUTES_INFO,
  IOC_CONTAINER: DECORATORS_METADATA_KEYS.IOC_CONTAINER,
  ROUTER: DECORATORS_METADATA_KEYS.ROUTER,
  PATH: DECORATORS_METADATA_KEYS.PATH,
  INSTANCE: DECORATORS_METADATA_KEYS.IOC_CONTROLLER_INSTANCE,
  getPath: (constructor) => {
    return Reflect.getMetadata(controllerMetadata.PATH, constructor);
  },
  setPath: (constructor, path) => {
    Reflect.defineMetadata(controllerMetadata.PATH, path, constructor);
  },
  createRouter: (constructor) => {
    const router = Reflect.getMetadata(controllerMetadata.ROUTER, constructor) || (0, import_express2.Router)();
    Reflect.defineMetadata(controllerMetadata.ROUTER, router, constructor);
    return router;
  },
  getControllerInstance: (constructor) => {
    const container = controllerMetadata.getIocContainer(constructor);
    const controller = Reflect.getMetadata(
      controllerMetadata.INSTANCE,
      constructor
    ) || container !== void 0 ? container?.get(
      ControllerSymbol
    ) : void 0;
    Reflect.defineMetadata(
      controllerMetadata.INSTANCE,
      controller,
      constructor
    );
    return controller;
  },
  getRouter: (constructor) => {
    return Reflect.getMetadata(controllerMetadata.ROUTER, constructor);
  },
  setIocContainer: (constructor, container) => {
    Reflect.defineMetadata(
      controllerMetadata.IOC_CONTAINER,
      container,
      constructor
    );
  },
  getIocContainer: (constructor) => {
    return Reflect.getMetadata(
      controllerMetadata.IOC_CONTAINER,
      constructor
    );
  },
  addControllerMiddleware: (target, middlewares) => {
    Reflect.defineMetadata(
      controllerMetadata.MIDDLEWARES,
      middlewares,
      target
    );
  },
  getControllerMiddlewares: (target) => {
    return Reflect.getMetadata(
      controllerMetadata.MIDDLEWARES,
      target
    ) || [];
  },
  addRouteInfoToController: (constructor, routeInfo) => {
    const controllerRoutesInfo = Reflect.getMetadata(
      controllerMetadata.CONTROLLER_ROUTES_INFO,
      constructor
    ) || [];
    controllerRoutesInfo.push(routeInfo);
    Reflect.defineMetadata(
      controllerMetadata.CONTROLLER_ROUTES_INFO,
      controllerRoutesInfo,
      constructor
    );
  },
  getControllerRoutesInfo: (constructor) => {
    const controllerRoutesInfo = Reflect.getMetadata(
      controllerMetadata.CONTROLLER_ROUTES_INFO,
      constructor
    ) || [];
    return controllerRoutesInfo;
  }
};

// src/meta/decorators/ioc.ts
var import_reflect_metadata3 = require("reflect-metadata");
var iocMetadata = {
  getAllDependencies: (target, propertyKey) => {
    return Reflect.getMetadata(
      DECORATORS_METADATA_KEYS.IOC_CONTAINER_KEYS,
      target,
      propertyKey
    ) || [];
  },
  addDependency: (target, propertyKey, dependency) => {
    const allDependencies = iocMetadata.getAllDependencies(
      target,
      propertyKey
    );
    allDependencies.push(dependency);
    Reflect.defineMetadata(
      DECORATORS_METADATA_KEYS.IOC_CONTAINER_KEYS,
      [...allDependencies],
      target,
      propertyKey
    );
  }
};

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Delete,
  Get,
  Head,
  Options,
  Patch,
  Post,
  Put,
  Trace
});
