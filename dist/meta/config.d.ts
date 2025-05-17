import { ExpressBatteriesConfig } from '../types/config.js';
import { Server } from 'socket.io';
import { Application } from 'express';
import http from 'node:http';
import { ICacheManager } from '../cache/types/cacheManager.js';
import 'cors';
import '../cache/types/cache.config.js';

type GlobalConfig = Required<ExpressBatteriesConfig>;
declare const expressBatteriesConfig: {
    setConfig: (config: ExpressBatteriesConfig | undefined) => void;
    getConfig: () => GlobalConfig;
    getErrorSchema: () => object;
    getSocketServer: () => Server;
    getHttpServer: () => http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    getExpressApp: () => Application;
    getCacheManager: () => ICacheManager;
    getCacheManagerOrNull: () => ICacheManager | null;
};

export { type GlobalConfig, expressBatteriesConfig };
