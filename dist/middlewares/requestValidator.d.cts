import { Request, Response, NextFunction } from 'express';
import { RequestValidationSchema } from '../types/requestValidationSchema.cjs';
import 'valibot';

type RequestValidatorProps = {
    bodySchema?: RequestValidationSchema;
    paramsSchema?: RequestValidationSchema;
    querySchema?: RequestValidationSchema;
};
declare const requestValidator: ({ bodySchema, paramsSchema, querySchema }: RequestValidatorProps) => (req: Request, _: Response, next: NextFunction) => Promise<void>;

export { type RequestValidatorProps, requestValidator };
