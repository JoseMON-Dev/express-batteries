import type { Server, Socket } from "socket.io";

export interface WebSocketEventHandler {
    event: string;
    handler: (socket: Socket) => (msg: any) => void | Promise<void>;
}

export type Context<T> = {
    body: T;
};

export type WebSocketEventHandlerMiddleware<T> = (
    server: Server,
    socket: Socket,
    ctx: Context<T>,
    next: () => Promise<void>,
) => void | Promise<void>;
