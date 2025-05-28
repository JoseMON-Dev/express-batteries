import type { Application } from "express";
import http from "http";
import { Server } from "socket.io";

export interface ExpressBatteriesApplication {
    express: Application;
    listen: (
        port: number,
    ) => Promise<
        | ReturnType<
            http.Server<
                typeof http.IncomingMessage,
                typeof http.ServerResponse
            >["listen"]
        >
        | ReturnType<Application["listen"]>
    >;
    wsServer: Server;
}
