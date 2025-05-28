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

// src/cache/decorators/invalidateCache.ts
var invalidateCache_exports = {};
__export(invalidateCache_exports, {
  invalidateCache: () => invalidateCache
});
module.exports = __toCommonJS(invalidateCache_exports);

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

// src/cache/meta/cache.ts
var cacheMetadata = {
  METHOD_CACHE: "cache_method_metadata_function",
  getCacheManager: () => {
    return expressBatteriesConfig.getCacheManager();
  },
  setCachedFunction: (target, propertyKey, fn) => {
    Reflect.defineMetadata(
      cacheMetadata.METHOD_CACHE,
      fn,
      target,
      propertyKey
    );
  },
  getCachedFunction: (target, propertyKey) => {
    return Reflect.getMetadata(
      cacheMetadata.METHOD_CACHE,
      target,
      propertyKey
    );
  }
};

// src/cache/decorators/invalidateCache.ts
function invalidateCache(keyOrPattern) {
  return function(_, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    const methodName = propertyKey.toString();
    const generateKeys = (args) => {
      if (typeof keyOrPattern === "string") {
        return [keyOrPattern];
      } else {
        const result = keyOrPattern(methodName, args);
        return Array.isArray(result) ? result : [result];
      }
    };
    const isAsync = originalMethod.constructor.name === "AsyncFunction";
    if (!isAsync) {
      throw new Error(
        "Synchronous methods are not supported for cache invalidation."
      );
    }
    descriptor.value = async function(...args) {
      const cacheManager = cacheMetadata.getCacheManager();
      const keys = generateKeys(args);
      for (const key of keys) {
        const cacheKeys = await cacheManager.keys(key);
        const deleted = await cacheManager.delete(cacheKeys);
        if (deleted) {
          if (process.env.NODE_ENV !== "production") {
            console.log(
              `[CACHE INVALIDATED] pattern ${key} cacheKeys: 
 ${cacheKeys}`
            );
          }
        }
      }
      const result = await originalMethod.apply(this, args);
      return result;
    };
    return descriptor;
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  invalidateCache
});
