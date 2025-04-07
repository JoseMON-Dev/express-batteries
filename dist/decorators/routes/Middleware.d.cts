import { RequestHandler } from 'express';

declare function Middleware(middleware: RequestHandler): MethodDecorator;
declare function Middlewares(...middlewares: RequestHandler[]): ClassDecorator | MethodDecorator;

export { Middleware, Middlewares };
