import {
    ApiError,
    Body,
    Controller,
    createModule,
    expressBatteries,
    Get,
    Params,
    Post,
    ResponseType,
    swaggerUI,
} from "./src/index";
import { inject, injectable } from "inversify";
import express, { NextFunction, Request, Response } from "express";
import * as v from "valibot";
import {
    onConnectionWebSocketGateWay,
    onDisconnectSocketGateWay,
    OnWsEvent,
    type WebSocketEventHandlerMiddleware,
    WebSocketsServer,
    WsBody,
    WsGateway,
    WsServer,
} from "./src/sockets";
import { Server, Socket } from "socket.io";
import { WsSocket } from "./src/sockets/decorators/webSocketParam";
import { WsMiddlewares } from "./src/sockets/decorators/webSocketMiddlewares";
import { ICacheManager } from "./src/cache/types";
import { cached } from "./src/cache/decorators/cache";
import { SetCommonOptions, SetGuards, SetTTL } from "./src/cache";
import { invalidateCache } from "./src/cache/decorators/invalidateCache";

export class InMemoryCacheManager implements ICacheManager {
    private cache: Map<string, any> = new Map();

    async get<T>(key: string): Promise<T | undefined | null> {
        const entry = this.cache.get(key);
        if (!entry) return undefined;

        if (entry.expiresAt < Date.now()) {
            this.cache.delete(key);
            return undefined;
        }

        return entry.value;
    }

    async set<T>(
        key: string,
        value: T,
        options?: SetTTL & SetGuards & SetCommonOptions,
    ): Promise<boolean> {
        this.cache.set(key, { value, options });
        console.log(this.cache);
        return true;
    }

    async keys(pattern: string): Promise<string[]> {
        const regex = new RegExp(pattern.replace("*", ".*"));
        return Array.from(this.cache.keys());
    }

    async delete(key: string): Promise<boolean> {
        return this.cache.delete(key);
    }

    async exists(key: string): Promise<boolean> {
        const entry = this.cache.get(key);
        if (!entry) return false;
        return entry.expiresAt >= Date.now();
    }

    getRawCache(): Map<string, any> {
        return this.cache;
    }

    clear(): void {
        this.cache.clear();
    }
}

@injectable()
class service {
    @cached({
        EX: 1,
    }, (methodName, args) => {
        return `${methodName}:pee`;
    })
    async a() {
        return Math.random();
    }

    @invalidateCache("a:pee")
    async b() {
        return Math.random();
    }
}

@Controller()
class a {
    constructor(
        @inject(service) public service: service,
        @inject(WebSocketsServer) public server: Server,
    ) {
    }

    @Get("/a")
    @ResponseType({
        headers: ["application/gzip", "application/json"],
        code: 200,
    })
    async get(req, res) {
        const b = await this.service.b();
        this.server.emit("pepe", "pesdfsdfsfpe");
        res.send(`${b}`);
    }
}

@Controller("/b")
class B {
    constructor(
        @inject(service) public service: service,
    ) {
    }

    @Post("/a/:id")
    @ResponseType({
        headers: ["application/gzip", "application/json"],
        code: 200,
    })
    @Params(v.object({ id: v.pipe(v.string(), v.uuid()) }))
    @Body(v.object({
        title: v.pipe(v.string(), v.uuid()),
        description: v.optional(v.string()),
    }))
    async exampletestting(req, res) {
        const a = await this.service.a();
        await res.send(`${a}`);
    }
}
const WsMiddleware: WebSocketEventHandlerMiddleware<string> = async (
    server,
    socket,
    ctx,
    next,
) => {
    console.log("middleware ", server.eventNames(), socket.id, ctx);
    ctx.body = "nuevo";
    await next();
};

@WsGateway()
class Ws {
    @OnWsEvent("joinWs")
    joinRoom(
        @WsSocket() socket: Socket,
    ) {
        socket.join("room-ws");
        socket.emit("joined", "Estás en room-ws");
    }

    @OnWsEvent("sendToWs")
    @WsMiddlewares([WsMiddleware])
    handleMessage(
        @WsServer() server: Server,
        @WsBody() msg: string,
    ) {
        console.log("WS → mensaje:", msg);
        server.to("room-ws").emit("msgFromWs", "WS → mensaje: " + msg);
    }
}

@WsGateway()
class Ws2 {
    @OnWsEvent("joinWs2")
    joinRoom(
        @WsSocket() socket: Socket,
    ) {
        socket.join("room-ws2");
        socket.emit("joined", "Estás en room-ws2");
    }

    @OnWsEvent("sendToWs2")
    @WsMiddlewares([WsMiddleware])
    handleMessage(
        @WsServer() server: Server,
        @WsBody() msg: string,
    ) {
        console.log("WS2 → mensaje:", msg);
        server.to("room-ws2").emit("msgFromWs2", msg);
    }
}

const app = expressBatteries(
    { cacheManager: new InMemoryCacheManager() },
);
app.express.use(express.json());
new Server();

createModule({
    app,
    path: "/str",
    controllers: [a, B],
    webSockets: [Ws, Ws2],
    services: [service],
});

const { html, json } = await swaggerUI({
    documentation: {
        info: {
            title: "PixPro Backend",
            version: "1.0.0",
            description: "Api docs",
        },
    },
});

app.express.use("/", html);
app.express.use("/json", json);

export const errorHandlingMiddleware = (
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log(err);
    try {
        if (err instanceof ApiError) {
            res.status(err.code).json(err.toJson());
            return;
        }
        res
            .status(500)
            .json(
                new ApiError(
                    err.message,
                    [
                        "Internal server error",
                    ],
                    500,
                ).toJson(),
            );
    } catch (error) {
        next(error);
    }
};

app.express.use(errorHandlingMiddleware);
app.listen(8080);
