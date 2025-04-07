import { RequestHandler } from 'express';
import { OpenAPIV3 } from 'openapi-types';
import { AllowedMethod } from '../types/openApi.js';
import 'valibot';

type OpenApiSpecsOptions = {
    documentation?: Omit<Partial<OpenAPIV3.Document>, "x-express-openapi-additional-middleware" | "x-express-openapi-validation-strict">;
    exclude?: Array<RegExp | string> | RegExp | string;
    excludeMethods?: AllowedMethod[];
    excludeStaticFile?: boolean;
    excludeTags?: string[];
};
declare const swaggerUI: (props: OpenApiSpecsOptions) => Promise<[RequestHandler, RequestHandler]>;

export { swaggerUI };
