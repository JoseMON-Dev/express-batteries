import type { Server, Socket } from "socket.io";

export interface onConnectionWebSocketGateWay {
    onServerConnection(socket: Socket, server: Server): void | Promise<void>;
}

export interface onDisconnectSocketGateWay {
    onServerDisconnection(
        socket: Socket,
        server: Server,
    ): void | Promise<void>;
}
