"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/decorators/ioc/Module.ts
var Module_exports = {};
__export(Module_exports, {
  createModule: () => createModule
});
module.exports = __toCommonJS(Module_exports);
var import_inversify3 = require("inversify");

// src/types/DevpsSymbols.ts
var ControllerSymbol = Symbol.for("Controller");

// src/sockets/meta/socketMetadata.ts
var import_reflect_metadata = require("reflect-metadata");

// src/meta/config.ts
var import_to_json_schema = __toESM(require("to-json-schema"), 1);

// src/errors/baseError.ts
var ApiError = class extends Error {
  constructor(message, errors, code) {
    super(message);
    this.errors = errors;
    this.code = code;
  }
  toJson() {
    return {
      errors: this.errors
    };
  }
};

// src/meta/config.ts
var import_socket = require("socket.io");
var import_express = __toESM(require("express"), 1);
var import_node_http = __toESM(require("http"), 1);
var import_node_https = __toESM(require("https"), 1);
var expressApp = null;
var webSocketsServer = null;
var httpServer = null;
var baseConfig = {
  ErrorClass: ApiError,
  cors: {
    origin: "*",
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
      "PATCH",
      "HEAD",
      "TRACE"
    ],
    credentials: true
  },
  cacheManager: null,
  https: null
};
var globalConfig = { ...baseConfig };
var expressBatteriesConfig = {
  setConfig: (config) => {
    if (config) {
      globalConfig = { ...globalConfig, ...config };
    }
  },
  getConfig: () => globalConfig,
  getErrorSchema: () => {
    const Error2 = expressBatteriesConfig.getConfig().ErrorClass;
    const instance = new Error2("error", ["erer", "sdsd"], 400);
    return (0, import_to_json_schema.default)(
      instance.toJson()
    );
  },
  getHttpServer: () => {
    if (httpServer) return httpServer;
    if (globalConfig.https) {
      httpServer = import_node_https.default.createServer(
        globalConfig.https,
        expressBatteriesConfig.getExpressApp()
      );
      return httpServer;
    }
    httpServer = import_node_http.default.createServer(
      expressBatteriesConfig.getExpressApp()
    );
    return httpServer;
  },
  getSocketServer: () => {
    if (webSocketsServer) return webSocketsServer;
    const server = expressBatteriesConfig.getHttpServer();
    webSocketsServer = new import_socket.Server(server, {
      cors: globalConfig.cors
    });
    return webSocketsServer;
  },
  getExpressApp: () => {
    if (expressApp) return expressApp;
    expressApp = (0, import_express.default)();
    return expressApp;
  },
  getCacheManager: () => {
    const cacheManager = globalConfig.cacheManager;
    if (cacheManager) return cacheManager;
    console.log("Cache manager not initialized");
    throw new Error("Cache manager not initialized");
  },
  getCacheManagerOrNull: () => {
    return globalConfig.cacheManager;
  }
};

// src/sockets/meta/socketMetadata.ts
var import_inversify = require("inversify");
var webSocketGateWayList = [];
var socketMetadata = {
  EVENT: "ws:event",
  GATEWAY_INSTANCE: "ws:Gateway",
  IOC_CONTAINER: "ws:IOC_Container",
  PARAMETERS_INDEX_DICT: "ws:class:server:parameterKey",
  HANDLERS: "ws:handlers",
  MIDDLEWARES: "ws:middlewares:fn",
  IS_GATEWAY: "ws:isgateWay",
  addMiddlewares: (target, propertyKey, list) => {
    Reflect.defineMetadata(
      socketMetadata.MIDDLEWARES,
      list,
      target,
      propertyKey
    );
  },
  getMiddlewaresList: (target, propertyKey) => {
    const middlewares = Reflect.getMetadata(
      socketMetadata.MIDDLEWARES,
      target,
      propertyKey
    ) || [];
    return middlewares;
  },
  setIsGateWay: (constructor) => {
    Reflect.defineMetadata(socketMetadata.IS_GATEWAY, true, constructor);
  },
  isGateWay: (constructor) => {
    return Reflect.getMetadata(socketMetadata.IS_GATEWAY, constructor) || false;
  },
  addGateWay: (constructor) => {
    webSocketGateWayList.push(constructor);
  },
  getGateWayList: () => {
    return webSocketGateWayList;
  },
  setIOCContainer: (constructor, container) => {
    Reflect.defineMetadata(
      socketMetadata.IOC_CONTAINER,
      container,
      constructor
    );
  },
  getIOCContainer: (constructor) => {
    return Reflect.getMetadata(
      socketMetadata.IOC_CONTAINER,
      constructor
    );
  },
  getGateWayInstance: (constructor) => {
    const container = socketMetadata.getIOCContainer(constructor);
    const gateWay = Reflect.getMetadata(
      socketMetadata.GATEWAY_INSTANCE,
      constructor
    ) || container !== void 0 ? container?.get(
      Symbol.for(constructor.name)
    ) : void 0;
    Reflect.defineMetadata(
      socketMetadata.GATEWAY_INSTANCE,
      gateWay,
      constructor
    );
    return gateWay;
  },
  addHandlerParameterIndex: (constructor, propertyKey, parameterIndex, wsHandlerParam) => {
    const map = socketMetadata.getParameterIndexDict(constructor);
    const props = map.get(propertyKey) || /* @__PURE__ */ new Map();
    props.set(wsHandlerParam, parameterIndex);
    map.set(propertyKey, props);
  },
  getParameterIndexDict: (target) => {
    const map = Reflect.getMetadata(
      socketMetadata.PARAMETERS_INDEX_DICT,
      target
    ) || /* @__PURE__ */ new Map();
    Reflect.defineMetadata(
      socketMetadata.PARAMETERS_INDEX_DICT,
      map,
      target
    );
    return map;
  },
  getAllEventHandlers: (constructor) => {
    return Reflect.getMetadata(socketMetadata.HANDLERS, constructor) || [];
  },
  addEventHandler: (handler, constructor) => {
    const handlers = socketMetadata.getAllEventHandlers(constructor);
    Reflect.defineMetadata(
      socketMetadata.HANDLERS,
      [...handlers, handler],
      constructor
    );
  }
};

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

// src/meta/docs_swagger.ts
var import_valibot_openapi_generator = require("@camflan/valibot-openapi-generator");

// src/meta/decorators/ioc.ts
var import_reflect_metadata2 = require("reflect-metadata");

// src/functions/parse.ts
var import_valibot = require("valibot");

// src/meta/decorators/validators/validators.ts
var import_reflect_metadata3 = require("reflect-metadata");
var bodyMetadata = {
  key: DECORATORS_METADATA_KEYS.BODY,
  addRouteBody: (value, target, propertyKey) => {
    if (Reflect.getMetadata(bodyMetadata.key, target, propertyKey)) {
      throw new Error(
        `Metadata ${bodyMetadata.key} already exists on ${target.constructor.name}#${typeof propertyKey === "symbol" ? propertyKey.description : propertyKey}. Body can only be defined once`
      );
    }
    Reflect.defineMetadata(bodyMetadata.key, value, target, propertyKey);
  },
  getRouteBody: (target, propertyKey) => {
    const metadata = Reflect.getMetadata(
      bodyMetadata.key,
      target,
      propertyKey
    );
    return metadata;
  }
};
var queryMetadata = {
  key: DECORATORS_METADATA_KEYS.QUERIES,
  addRouteQuery: (value, target, propertyKey) => {
    if (Reflect.getMetadata(queryMetadata.key, target, propertyKey)) {
      throw new Error(
        `Metadata ${queryMetadata.key} already exists on ${target.constructor.name}#${typeof propertyKey === "symbol" ? propertyKey.description : propertyKey}. Params can only be defined once`
      );
    }
    Reflect.defineMetadata(queryMetadata.key, value, target, propertyKey);
  },
  getRouteQuery: (target, propertyKey) => {
    const metadata = Reflect.getMetadata(
      queryMetadata.key,
      target,
      propertyKey
    );
    return metadata;
  }
};
var paramsMetadata = {
  key: DECORATORS_METADATA_KEYS.PARAMS,
  addRouteParams: (value, target, propertyKey) => {
    if (Reflect.getMetadata(paramsMetadata.key, target, propertyKey)) {
      throw new Error(
        `Metadata ${paramsMetadata.key} already exists on ${target.constructor.name}#${typeof propertyKey === "symbol" ? propertyKey.description : propertyKey}. Params can only be defined once`
      );
    }
    Reflect.defineMetadata(paramsMetadata.key, value, target, propertyKey);
  },
  getRouteParams: (target, propertyKey) => {
    const metadata = Reflect.getMetadata(
      paramsMetadata.key,
      target,
      propertyKey
    );
    return metadata;
  }
};

// src/meta/decorators/route/route.ts
var import_reflect_metadata4 = require("reflect-metadata");
var import_express2 = require("express");
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

// src/meta/decorators/controller/controller.ts
var import_reflect_metadata5 = require("reflect-metadata");
var import_express3 = require("express");

// src/types/ExpressBatteriesApplication.ts
var import_socket2 = require("socket.io");

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
    const router = Reflect.getMetadata(controllerMetadata.ROUTER, constructor) || (0, import_express3.Router)();
    Reflect.defineMetadata(controllerMetadata.ROUTER, router, constructor);
    return router;
  },
  getControllerInstance: (constructor) => {
    const container = controllerMetadata.getIocContainer(constructor);
    const controller = Reflect.getMetadata(
      controllerMetadata.INSTANCE,
      constructor
    ) || container !== void 0 ? container?.get(
      Symbol.for(constructor.name)
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

// src/functions/setUpControllers.ts
var import_express4 = require("express");
var import_inversify2 = require("inversify");

// src/sockets/types/index.ts
var WebSocketsServer = "6b376b734d980df4c233";

// src/sockets/index.ts
var WebSocketGateWaySymbol = Symbol.for("WEBSOCKETGATEWAYSYMBOLIOC");

// src/decorators/ioc/Module.ts
async function createModule(props) {
  if (props.path === "/") {
    throw new Error("The path is required only '/' path is invalid");
  }
  const container = new import_inversify3.Container();
  setupStaticInjection(container);
  if (props.modules && props.modules.length > 0) {
    for (let i = 0; i < props.modules.length; i++) {
      const module2 = props.modules[i];
      if (module2) {
        await setupModuleInjection(module2, container);
      }
    }
  }
  await setupModuleInjection({ ...props, container }, container);
  if (props.webSockets) {
    setupWsSocketsInjection(props.webSockets, container);
  }
  setupControllersInjection(
    container,
    props.controllers,
    props.app,
    props.path
  );
  return {
    ...props,
    container
  };
}
var setupModuleInjection = async (props, container) => {
  const { dependencyLoaders, services } = props;
  if (dependencyLoaders) {
    await setupDependencyLoaders(dependencyLoaders, container);
  }
  if (services) {
    setupServicesInjection(container, services);
  }
};
var setupDependencyLoaders = async (dependencyLoaders, container) => {
  for (const loader of dependencyLoaders) {
    await loader(container);
  }
};
var setupWsSocketsInjection = (webSockets, container) => {
  webSockets?.forEach((ws) => {
    if (socketMetadata.isGateWay(ws)) {
      container.bind(Symbol.for(ws.name)).to(ws).inSingletonScope();
      container.bind(WebSocketGateWaySymbol).to(ws).inSingletonScope();
      socketMetadata.setIOCContainer(ws, container);
      socketMetadata.addGateWay(ws);
    } else {
      throw new Error(`${ws} is not a webSocket gateway`);
    }
  });
};
var setupServicesInjection = (container, services) => {
  services?.forEach((service) => {
    Array.isArray(service) ? container.bind(service[0]).to(service[1]) : container.bind(service).to(service);
  });
};
var setupControllersInjection = (container, controllers, app, path) => {
  controllers.forEach((c) => {
    container.bind(ControllerSymbol).to(
      c
    ).inSingletonScope();
    container.bind(Symbol.for(c.name)).to(c).inSingletonScope();
  });
  container.getAll(ControllerSymbol).forEach((c) => {
    c.___setUp___(app.express, path, container);
  });
};
var setupStaticInjection = (container) => {
  if (expressBatteriesConfig.getCacheManagerOrNull()) {
    container.bind(Symbol.for("ICacheManager")).toConstantValue(
      expressBatteriesConfig.getCacheManager()
    );
  }
  container.bind(WebSocketsServer).toDynamicValue(() => {
    return expressBatteriesConfig.getSocketServer();
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createModule
});
