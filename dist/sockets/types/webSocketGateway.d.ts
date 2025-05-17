import { Socket, Server } from 'socket.io';

interface onConnectionWebSocketGateWay {
    onServerConnection(socket: Socket, server: Server): void | Promise<void>;
}
interface onDisconnectSocketGateWay {
    onServerDisconnection(socket: Socket, server: Server): void | Promise<void>;
}

export type { onConnectionWebSocketGateWay, onDisconnectSocketGateWay };
