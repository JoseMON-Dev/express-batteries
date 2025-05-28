import { Server, Socket } from 'socket.io';

interface WebSocketEventHandler {
    event: string;
    handler: (socket: Socket) => (msg: any) => void | Promise<void>;
}
type Context<T> = {
    body: T;
};
type WebSocketEventHandlerMiddleware<T> = (server: Server, socket: Socket, ctx: Context<T>, next: () => Promise<void>) => void | Promise<void>;

export type { Context, WebSocketEventHandler, WebSocketEventHandlerMiddleware };
