import toJsonSchema from "to-json-schema";
import { ApiError } from "../errors/baseError";
import type { ExpressBatteriesConfig } from "../types/config";
import { Server } from "socket.io";
import express, { type Application } from "express";
import http from "node:http";

let expressApp: Application | null = null;
let webSocketsServer: Server | null = null;
let httpServer:
    | http.Server<
        typeof http.IncomingMessage,
        typeof http.ServerResponse
    >
    | null = null;
const baseConfig: GlobalConfig = {
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
            "TRACE",
        ],
        credentials: true,
    },
};

export type GlobalConfig = Required<ExpressBatteriesConfig>;

let globalConfig: GlobalConfig = { ...baseConfig };

export const expressBatteriesConfig: {
    setConfig: (config: ExpressBatteriesConfig | undefined) => void;
    getConfig: () => GlobalConfig;
    getErrorSchema: () => object;
    getSocketServer: () => Server;
    getHttpServer: () => http.Server<
        typeof http.IncomingMessage,
        typeof http.ServerResponse
    >;
    getExpressApp: () => Application;
} = {
    setConfig: (config: ExpressBatteriesConfig | undefined) => {
        if (config) {
            globalConfig = { ...globalConfig, ...config };
        }
    },
    getConfig: () => globalConfig,
    getErrorSchema: () => {
        const Error = expressBatteriesConfig.getConfig().ErrorClass;
        const instance = new Error("error", ["erer", "sdsd"], 400);
        return toJsonSchema(
            instance.toJson(),
        );
    },

    getHttpServer: () => {
        if (httpServer) return httpServer;
        httpServer = http.createServer(
            expressBatteriesConfig.getExpressApp(),
        );
        return httpServer;
    },

    getSocketServer: () => {
        if (webSocketsServer) return webSocketsServer;
        const server = expressBatteriesConfig.getHttpServer();
        webSocketsServer = new Server(server, {
            cors: globalConfig.cors,
        });
        return webSocketsServer;
    },

    getExpressApp: () => {
        if (expressApp) return expressApp;
        expressApp = express();
        return expressApp;
    },
};
