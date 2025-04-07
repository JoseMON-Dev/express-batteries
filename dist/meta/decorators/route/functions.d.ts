import { RequestHandler } from 'express';

declare function createValidationRequestMiddleware(target: object, propertyKey: string | symbol): RequestHandler;

export { createValidationRequestMiddleware };
