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

// src/decorators/routes/validators/Query.ts
var Query_exports = {};
__export(Query_exports, {
  Query: () => Query
});
module.exports = __toCommonJS(Query_exports);

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
var import_express2 = __toESM(require("express"), 1);
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
    expressApp = (0, import_express2.default)();
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

// src/meta/httpCodes.ts
var httpCodes = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};
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

// src/functions/parse.ts
var import_valibot = require("valibot");
var parse = (schema, data) => {
  const errors = [];
  const result = (0, import_valibot.safeParse)(schema, data);
  if (!result.success) {
    errors.push(...result.issues.map((issue) => issue.message));
    return { success: false, errors, data: {} };
  }
  return { success: true, errors, data };
};

// src/middlewares/requestValidator.ts
var requestValidator = ({ bodySchema, paramsSchema, querySchema }) => async (req, _, next) => {
  const BadRequestError = expressBatteriesConfig.getConfig().ErrorClass;
  if (BadRequestError === void 0 || BadRequestError === null) {
    throw new Error(
      "expressBatteriesConfig is not defined errorClass is required"
    );
  }
  const errors = [];
  if (bodySchema) {
    if (!req.body) {
      return next(
        new BadRequestError(
          "Missing request body",
          ["Missing request body"],
          httpCodes.BAD_REQUEST
        )
      );
    }
    const result = parse(bodySchema, req.body);
    if (!result.success) errors.push(...result.errors);
    else req.body = result.data;
  }
  if (paramsSchema) {
    if (!req.params) {
      return next(
        new BadRequestError(
          "Missing request params",
          ["Missing request params"],
          httpCodes.BAD_REQUEST
        )
      );
    }
    const result = parse(paramsSchema, req.params);
    if (!result.success) errors.push(...result.errors);
    else req.params = result.data;
  }
  if (querySchema) {
    if (!req.query) {
      return next(
        new BadRequestError(
          "Missing request query",
          ["Missing request query"],
          httpCodes.BAD_REQUEST
        )
      );
    }
    const result = parse(querySchema, req.query);
    if (!result.success) errors.push(...result.errors);
    else req.query = result.data;
  }
  if (errors.length > 0) {
    return next(
      new BadRequestError(
        "Bad Request Error",
        errors,
        httpCodes.BAD_REQUEST
      )
    );
  }
  next();
};

// src/meta/decorators/validators/validators.ts
var import_reflect_metadata2 = require("reflect-metadata");
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

// src/meta/decorators/route/functions.ts
function createValidationRequestMiddleware(target, propertyKey) {
  const bodySchema = bodyMetadata.getRouteBody(target, propertyKey);
  const paramsSchema = paramsMetadata.getRouteParams(target, propertyKey);
  const querySchema = queryMetadata.getRouteQuery(target, propertyKey);
  const handler = requestValidator({
    bodySchema,
    paramsSchema,
    querySchema
  });
  return handler;
}

// src/meta/decorators/validators/functions.ts
function addValidationMiddleware(target, propertyKey) {
  routeMetadata.addRouteMiddleware(
    target,
    propertyKey,
    createValidationRequestMiddleware(target, propertyKey)
  );
}

// src/functions/describeSetting.ts
function describeSetting(setting) {
  if (typeof setting === "string") {
    return setting;
  }
  if (typeof setting === "number") {
    return `${setting}`;
  }
  return `${String(setting.description ?? setting.toString())}`;
}

// src/meta/docs_swagger.ts
var import_valibot_openapi_generator = require("@camflan/valibot-openapi-generator");

// src/meta/decorators/ioc.ts
var import_reflect_metadata3 = require("reflect-metadata");

// src/meta/decorators/controller/controller.ts
var import_reflect_metadata4 = require("reflect-metadata");
var import_express3 = require("express");

// src/types/DevpsSymbols.ts
var ControllerSymbol = Symbol.for("Controller");

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

// src/decorators/routes/validators/Query.ts
function Query(schema) {
  return (target, propertyKey) => {
    queryMetadata.addRouteQuery(
      schema,
      target,
      propertyKey
    );
    addValidationMiddleware(target, propertyKey);
    const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
      target,
      propertyKey
    );
    const queryParams = Object.keys(
      schema.entries
    ).map((key) => ({
      in: "query",
      name: describeSetting(key)
    }));
    const baseResponses = {
      400: {
        description: descriptionHttpCode[400],
        content: {
          "application/json": {
            schema: expressBatteriesConfig.getErrorSchema()
          }
        }
      },
      ...routesOpenApiInfo?.routeOptions?.responses || {}
    };
    const baseParameters = [
      ...routesOpenApiInfo?.routeOptions?.parameters || [],
      ...queryParams
    ];
    const openApiInfo = {
      ...routesOpenApiInfo || {},
      routeOptions: {
        ...routesOpenApiInfo?.routeOptions || {},
        parameters: baseParameters,
        responses: baseResponses
      }
    };
    routeMetadata.saveRoutesOpenApiInfo(openApiInfo, target, propertyKey);
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Query
});
