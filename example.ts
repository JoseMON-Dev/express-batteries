import {
    Body,
    Controller,
    createModule,
    expressBatteries,
    Get,
    ResponseType,
    swaggerUI,
} from "./src/index";
import { inject, injectable } from "inversify";
import {
    onConnectionWebSocketGateWay,
    onDisconnectSocketGateWay,
    OnWsEvent,
    WebSocketEventHandlerMiddleware,
    WsBody,
    WsGateway,
    WsServer,
} from "./src/sockets";
import { Server, Socket } from "socket.io";
import { WsSocket } from "./src/sockets/decorators/webSocketParam";
import { WsMiddlewares } from "./src/sockets/decorators/webSocketMiddlewares";

@injectable()
class service {
    a() {
        console.log(" service from controller call");
        return "service";
    }
}

@Controller()
class a {
    constructor(
        @inject(service) public service: service,
    ) {
    }

    @Get("/a")
    @ResponseType({
        headers: ["application/gzip", "application/json"],
        code: 200,
    })
    get(req, res) {
        res.send(this.service.a());
    }
}

@Controller("/b")
class B {
    constructor(
        @inject(service) public service: service,
    ) {
    }

    @Get("/a")
    @ResponseType({
        headers: ["application/gzip", "application/json"],
        code: 200,
    })
    get(req, res) {
        res.send(this.service.a());
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

const app = expressBatteries();

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
app.listen(8080);
