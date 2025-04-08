import "reflect-metadata";
import { expressBatteriesConfig } from "../../meta/config";
import { Server } from "socket.io";
import http from "http";

export const socketMetadata = {
    PATH: "ws:path",
    EVENT: "ws:event",

    addSocketBasePath: (path: string, target: Function) => {
        Reflect.defineMetadata(socketMetadata.PATH, path, target);
    },

    addEvent: (
        event: string,
        handler: Function,
        target: object,
        propertyKey: string,
    ) => {
        Reflect.defineMetadata(socketMetadata.EVENT, event, target);
    },

    getServer: () => {
        return expressBatteriesConfig.getSocketServer();
    },
};
