import { OpenAPIRoute } from './openApi.js';
import 'openapi-types';
import 'valibot';

type HttpMethodsExpress = "all" | "get" | "put" | "post" | "delete" | "options" | "head" | "patch" | "trace";
type OpenApiHttpMethods = "ALL" | OpenAPIRoute["method"];

export type { HttpMethodsExpress, OpenApiHttpMethods };
