import type { OpenAPIRoute } from "./openApi";

export type HttpMethodsExpress =
    | "all"
    | "get"
    | "put"
    | "post"
    | "delete"
    | "options"
    | "head"
    | "patch"
    | "trace";

export type OpenApiHttpMethods = "ALL" | OpenAPIRoute["method"];
