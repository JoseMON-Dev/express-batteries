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

// src/sockets/decorators/webSocketServer.ts
var webSocketServer_exports = {};
__export(webSocketServer_exports, {
  WsServer: () => WsServer
});
module.exports = __toCommonJS(webSocketServer_exports);

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

// src/sockets/decorators/webSocketServer.ts
function WsServer() {
  return (target, propertyKey, parameterIndex) => {
    if (target && parameterIndex >= 0 && propertyKey) {
      socketMetadata.addHandlerParameterIndex(
        target.constructor,
        propertyKey,
        parameterIndex,
        "server"
      );
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WsServer
});
