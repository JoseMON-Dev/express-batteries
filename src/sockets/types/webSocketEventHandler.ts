import type { Socket } from "socket.io";

export interface WebSocketEventHandler {
    event: string;
    handler: (socket: Socket) => (msg: any) => void | Promise<void>;
}
