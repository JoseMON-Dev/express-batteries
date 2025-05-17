import { Application } from 'express';
import http from 'http';
import { Server } from 'socket.io';

interface ExpressBatteriesApplication {
    express: Application;
    listen: (port: number) => ReturnType<http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>["listen"]> | ReturnType<Application["listen"]>;
    wsServer: Server;
}

export type { ExpressBatteriesApplication };
