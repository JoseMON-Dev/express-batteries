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

// src/decorators/ioc/Inject.ts
var Inject_exports = {};
__export(Inject_exports, {
  Inject: () => Inject
});
module.exports = __toCommonJS(Inject_exports);

// src/meta/decorators/ioc.ts
var import_reflect_metadata = require("reflect-metadata");

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

// src/meta/decorators/ioc.ts
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

// src/decorators/ioc/Inject.ts
var Inject = (dependencySymbol, options) => {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey && parameterIndex) {
      iocMetadata.addDependency(target, propertyKey, {
        dependencySymbol,
        options,
        index: parameterIndex
      });
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Inject
});
