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

// src/decorators/routes/Response.ts
var Response_exports = {};
__export(Response_exports, {
  ResponseType: () => ResponseType
});
module.exports = __toCommonJS(Response_exports);

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

// src/decorators/routes/Response.ts
var import_to_json_schema = __toESM(require("to-json-schema"), 1);

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
    const schema2 = isValibotSchema(obj) ? obj : JSON.parse(JSON.stringify((0, import_to_json_schema.default)(obj)));
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ResponseType
});
