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

// src/decorators/routes/Controller.ts
var Controller_exports = {};
__export(Controller_exports, {
  Controller: () => Controller
});
module.exports = __toCommonJS(Controller_exports);

// src/types/DevpsSymbols.ts
var ControllerSymbol = Symbol.for("Controller");

// src/decorators/routes/Controller.ts
var import_valibot_openapi_generator2 = require("@camflan/valibot-openapi-generator");

// src/meta/decorators/controller/controller.ts
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
    const router = Reflect.getMetadata(controllerMetadata.ROUTER, constructor) || (0, import_express.Router)();
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

// src/meta/docs_swagger.ts
var import_valibot_openapi_generator = require("@camflan/valibot-openapi-generator");
var SWAGGER_DOC = [];

// src/decorators/routes/Controller.ts
function Controller(path) {
  return (target) => {
    const router = controllerMetadata.getRouter(target);
    controllerMetadata.setPath(target, path);
    if (!router) {
      throw new Error(`Controller ${target.name} needs a route`);
    }
    const proto = target.prototype;
    proto.___setUp___ = (app, basePath, container) => {
      controllerMetadata.setIocContainer(target, container);
      const fullPath = `${basePath}${path ? path : ""}`;
      const routesInfo = controllerMetadata.getControllerRoutesInfo(
        target
      );
      routesInfo.forEach((r) => {
        const p = `${fullPath}${r.path}`;
        SWAGGER_DOC.push(
          (0, import_valibot_openapi_generator2.describeRoute)(p, r.routeOptions)
        );
      });
      const middlewares = controllerMetadata.getControllerMiddlewares(target);
      if (middlewares.length) {
        app.use(fullPath, ...middlewares);
      }
      app.use(fullPath, router);
    };
    return target;
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Controller
});
