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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ALLOWED_METHODS: () => ALLOWED_METHODS,
  ApiError: () => ApiError,
  Body: () => Body,
  Controller: () => Controller,
  ControllerSymbol: () => ControllerSymbol,
  CreateModule: () => CreateModule,
  DECORATORS_METADATA_KEYS: () => DECORATORS_METADATA_KEYS,
  Delete: () => Delete,
  ExpressBatteriesTs: () => ExpressBatteriesTs,
  Get: () => Get,
  Head: () => Head,
  Inject: () => Inject,
  Middleware: () => Middleware,
  Middlewares: () => Middlewares,
  Options: () => Options,
  Params: () => Params,
  Patch: () => Patch,
  Post: () => Post,
  Put: () => Put,
  Query: () => Query,
  ResponseType: () => ResponseType,
  SWAGGER_DOC: () => SWAGGER_DOC,
  Trace: () => Trace,
  addValidationMiddleware: () => addValidationMiddleware,
  bodyMetadata: () => bodyMetadata,
  controllerMetadata: () => controllerMetadata,
  createValidationRequestMiddleware: () => createValidationRequestMiddleware,
  describeSetting: () => describeSetting,
  descriptionHttpCode: () => descriptionHttpCode,
  expressBatteries: () => expressBatteries,
  expressBatteriesConfig: () => expressBatteriesConfig,
  httpCodes: () => httpCodes,
  iocMetadata: () => iocMetadata,
  isValibotSchema: () => isValibotSchema,
  paramsMetadata: () => paramsMetadata,
  parse: () => parse,
  queryMetadata: () => queryMetadata,
  requestValidator: () => requestValidator,
  routeMetadata: () => routeMetadata,
  setUpControllers: () => setUpControllers,
  swaggerUI: () => swaggerUI
});
module.exports = __toCommonJS(index_exports);
var import_reflect_metadata5 = require("reflect-metadata");

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
var baseConfig = {
  ErrorClass: ApiError
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
    const instance = new Error2("error", ["erer", "sdsd"], 200);
    return (0, import_to_json_schema.default)(
      instance.toJson()
    );
  }
};

// src/index.ts
var import_express5 = require("express");
var import_express6 = __toESM(require("express"), 1);

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

// src/types/openApi.ts
var ALLOWED_METHODS = [
  "GET",
  "PUT",
  "POST",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "PATCH",
  "TRACE"
];

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

// src/meta/decorators/route/route.ts
var import_reflect_metadata2 = require("reflect-metadata");
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

// src/decorators/routes/Middleware.ts
function Middleware(middleware) {
  return (target, propertyKey) => {
    routeMetadata.addRouteMiddleware(target, propertyKey, middleware);
  };
}
function Middlewares(...middlewares) {
  return (target, propertyKey) => {
    if (propertyKey) {
      middlewares.forEach((middleware) => {
        routeMetadata.addRouteMiddleware(
          target,
          propertyKey,
          middleware
        );
      });
    } else {
      controllerMetadata.addControllerMiddleware(target, middlewares);
    }
  };
}

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

// src/decorators/routes/Response.ts
var import_to_json_schema2 = __toESM(require("to-json-schema"), 1);

// src/functions/isValibotSchema.ts
function isValibotSchema(obj) {
  return obj.kind === "schema";
}

// src/decorators/routes/Response.ts
var import_clean_deep = __toESM(require("clean-deep"), 1);
var ResponseType = ({ code, description, schema, headers }) => {
  const obj = schema;
  const responses = {};
  let content;
  if (obj) {
    const head = headers || ["application/json"];
    const schema2 = isValibotSchema(obj) ? obj : JSON.parse(JSON.stringify((0, import_to_json_schema2.default)(obj)));
    content = head.reduce((acc, head2) => {
      acc[head2] = {
        schema: schema2
      };
      return acc;
    }, {});
  }
  if (content) {
    responses[code] = {
      description: description || descriptionHttpCode[code],
      content
    };
  } else {
    responses[code] = {
      description: description || descriptionHttpCode[code],
      content: headers ? headers.reduce((acc, head) => {
        acc[head] = {
          schema
        };
        return acc;
      }, {}) : void 0
    };
  }
  return (target, propertyKey) => {
    const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
      target,
      propertyKey
    );
    const cleanedResponses = (0, import_clean_deep.default)(responses, {
      emptyArrays: false,
      emptyObjects: false,
      emptyStrings: false
    });
    if (routesOpenApiInfo) {
      routeMetadata.saveRoutesOpenApiInfo(
        {
          ...routesOpenApiInfo,
          routeOptions: {
            ...routesOpenApiInfo.routeOptions,
            responses: {
              ...routesOpenApiInfo.routeOptions.responses,
              ...cleanedResponses
            }
          }
        },
        target,
        propertyKey
      );
    } else {
      routeMetadata.saveRoutesOpenApiInfo(
        {
          routeOptions: {
            responses: { ...cleanedResponses }
          }
        },
        target,
        propertyKey
      );
    }
  };
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
var import_reflect_metadata4 = require("reflect-metadata");
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
  const haveValidation = Reflect.getMetadata(
    DECORATORS_METADATA_KEYS.HAVE_VALIDATION,
    target,
    propertyKey
  );
  if (!haveValidation) {
    Reflect.defineMetadata(
      DECORATORS_METADATA_KEYS.HAVE_VALIDATION,
      true,
      target,
      propertyKey
    );
    routeMetadata.addRouteMiddleware(
      target,
      propertyKey,
      createValidationRequestMiddleware(target, propertyKey)
    );
  }
}

// src/decorators/routes/validators/Body.ts
function Body(schema) {
  const headers = ["application/json"];
  return (target, propertyKey) => {
    const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
      target,
      propertyKey
    );
    const baseRouteOptions = {
      responses: {
        400: {
          description: descriptionHttpCode[400],
          content: {
            "application/json": {
              schema: expressBatteriesConfig.getErrorSchema()
            }
          }
        },
        ...routesOpenApiInfo?.routeOptions?.responses || {}
      }
    };
    const c = {};
    const list = Array.isArray(headers) ? headers : [headers];
    list.forEach((h) => {
      c[h] = {
        schema
      };
    });
    bodyMetadata.addRouteBody(schema, target, propertyKey);
    addValidationMiddleware(target, propertyKey);
    baseRouteOptions.requestBody = {
      content: c
    };
    const openApiInfo = routesOpenApiInfo ? {
      ...routesOpenApiInfo,
      routeOptions: {
        ...routesOpenApiInfo.routeOptions,
        ...baseRouteOptions
      }
    } : {
      routeOptions: baseRouteOptions
    };
    routeMetadata.saveRoutesOpenApiInfo(openApiInfo, target, propertyKey);
  };
}

// src/decorators/routes/validators/Params.ts
function Params(schema) {
  return (target, propertyKey) => {
    paramsMetadata.addRouteParams(schema, target, propertyKey);
    addValidationMiddleware(target, propertyKey);
    const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
      target,
      propertyKey
    );
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
    const openApiInfo = {
      ...routesOpenApiInfo || {},
      routeOptions: {
        ...routesOpenApiInfo?.routeOptions || {},
        responses: baseResponses
      }
    };
    routeMetadata.saveRoutesOpenApiInfo(openApiInfo, target, propertyKey);
  };
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

// src/decorators/ioc/Module.ts
var import_inversify = require("inversify");
function CreateModule({
  controllers,
  services,
  path,
  app,
  dependencyLoaders
}) {
  const container = new import_inversify.Container();
  dependencyLoaders?.forEach((fn) => {
    fn(container);
  });
  services?.forEach((service) => {
    Array.isArray(service) ? container.bind(service[0]).to(service[1]) : container.bind(service).to(service);
  });
  controllers.forEach((c) => {
    container.bind(ControllerSymbol).to(
      c
    ).inSingletonScope();
  });
  container.getAll(ControllerSymbol).forEach((c) => {
    c.___setUp___(app, path, container);
  });
}

// src/functions/setUpControllers.ts
var import_express3 = require("express");
var import_inversify2 = require("inversify");
var setUpControllers = (app, container, path) => {
  const controllers = container.getAll(
    ControllerSymbol
  );
  controllers.forEach((controller) => {
    if (!controller.___setUp___) {
      throw new Error(
        "Controller must have @Controller decorator, controller: " + controller.constructor.name
      );
    }
    controller.___setUp___(app, path, container);
  });
  return app;
};

// src/middlewares/swagger.ts
var import_valibot_openapi_generator3 = require("@camflan/valibot-openapi-generator");
var import_express4 = require("express");
var swaggerUi = __toESM(require("swagger-ui-express"), 1);
var generateSwaggerDoc = async (props) => {
  const specs = await (0, import_valibot_openapi_generator3.getOpenAPISpecs)(
    SWAGGER_DOC,
    props
  );
  return specs;
};
var swaggerUI = async (props) => {
  const doc = await generateSwaggerDoc(props);
  const docHandler = (_, res, _n) => {
    res.json(doc);
  };
  return [swaggerUi.setup(doc), docHandler];
};

// src/nameTsPlugin.ts
var ExpressBatteriesTs;
((ExpressBatteriesTs2) => {
  function name() {
    return "";
  }
  ExpressBatteriesTs2.name = name;
})(ExpressBatteriesTs || (ExpressBatteriesTs = {}));

// src/index.ts
var expressBatteries = (config) => {
  const app = (0, import_express6.default)();
  expressBatteriesConfig.setConfig(config);
  return app;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ALLOWED_METHODS,
  ApiError,
  Body,
  Controller,
  ControllerSymbol,
  CreateModule,
  DECORATORS_METADATA_KEYS,
  Delete,
  ExpressBatteriesTs,
  Get,
  Head,
  Inject,
  Middleware,
  Middlewares,
  Options,
  Params,
  Patch,
  Post,
  Put,
  Query,
  ResponseType,
  SWAGGER_DOC,
  Trace,
  addValidationMiddleware,
  bodyMetadata,
  controllerMetadata,
  createValidationRequestMiddleware,
  describeSetting,
  descriptionHttpCode,
  expressBatteries,
  expressBatteriesConfig,
  httpCodes,
  iocMetadata,
  isValibotSchema,
  paramsMetadata,
  parse,
  queryMetadata,
  requestValidator,
  routeMetadata,
  setUpControllers,
  swaggerUI
});
