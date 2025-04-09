import {
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
    OnWebSocketEvent,
    WebSocketGateway,
    WebSocketServer,
} from "./src/sockets";
import { Server, Socket } from "socket.io";
import { serve } from "swagger-ui-express";

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

@WebSocketGateway()
class Ws implements onConnectionWebSocketGateWay, onDisconnectSocketGateWay {
    onServerDisconnection(
        socket: Socket,
        server: Server,
        body: any,
    ): void | Promise<void> {
        console.log(socket, server, body);
    }
    private readonly sample = "pepe";

    onServerConnection(socket: Socket): void | Promise<void> {
        console.log("connected in " + socket.id, " " + this.sample);
    }
    @OnWebSocketEvent("sample")
    async p(@WebSocketServer() server: Server) {
        console.log(this.sample);
    }
}

@WebSocketGateway()
class Ws2 {
    @OnWebSocketEvent("sample")
    async p(@WebSocketServer() server: Server) {
        console.log(server);
    }
}

const app = expressBatteries();

new Server();

createModule({
    app,
    path: "/str",
    controllers: [a, B],
    webSockets: [Ws],
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
