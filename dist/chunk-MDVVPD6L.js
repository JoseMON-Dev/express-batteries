import {
  ApiError
} from "./chunk-YIHLBXI6.js";

// src/meta/config.ts
import toJsonSchema from "to-json-schema";
import { Server } from "socket.io";
import express from "express";
import http from "node:http";
import https from "node:https";
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
    return toJsonSchema(
      instance.toJson()
    );
  },
  getHttpServer: () => {
    if (httpServer) return httpServer;
    if (globalConfig.https) {
      httpServer = https.createServer(
        globalConfig.https,
        expressBatteriesConfig.getExpressApp()
      );
      return httpServer;
    }
    httpServer = http.createServer(
      expressBatteriesConfig.getExpressApp()
    );
    return httpServer;
  },
  getSocketServer: () => {
    if (webSocketsServer) return webSocketsServer;
    const server = expressBatteriesConfig.getHttpServer();
    webSocketsServer = new Server(server, {
      cors: globalConfig.cors
    });
    return webSocketsServer;
  },
  getExpressApp: () => {
    if (expressApp) return expressApp;
    expressApp = express();
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

export {
  expressBatteriesConfig
};
