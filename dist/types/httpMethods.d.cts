import { OpenAPIRoute } from './openApi.cjs';
import 'openapi-types';
import 'valibot';

type HttpMethodsExpress = "all" | "get" | "put" | "post" | "delete" | "options" | "head" | "patch" | "trace";
type OpenApiHttpMethods = "ALL" | OpenAPIRoute["method"];

export type { HttpMethodsExpress, OpenApiHttpMethods };
