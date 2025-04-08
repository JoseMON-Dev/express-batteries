import toJsonSchema from "to-json-schema";
import { ApiError } from "../errors/baseError";
import type { ExpressBatteriesConfig } from "../types/config";
import { Server, type ServerOptions } from "socket.io";
import express, { type Express } from "express";
import http from "http";

let expressApp: Express | null = null;
let webSocketsServer = null;
const baseConfig: GlobalConfig = {
    ErrorClass: ApiError,
    cors: {
        origin: "*",
    },
};

export type GlobalConfig = Required<ExpressBatteriesConfig>;

let globalConfig: GlobalConfig = { ...baseConfig };

export const expressBatteriesConfig: {
    setConfig: (config: ExpressBatteriesConfig | undefined) => void;
    getConfig: () => GlobalConfig;
    getErrorSchema: () => object;
    getSocketServer: () => Server;
    getExpressApp: () => Express;
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

    getSocketServer: () => {
        if (webSocketsServer) return webSocketsServer;
        const server = http.createServer(
            expressBatteriesConfig.getExpressApp(),
        );
        return new Server(server, globalConfig.cors as ServerOptions);
    },

    getExpressApp: () => {
        if (expressApp) return expressApp;
        expressApp = express();
        return expressApp;
    },
};
