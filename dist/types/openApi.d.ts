import { OpenAPIV3 } from 'openapi-types';
import { BaseSchema, BaseIssue } from 'valibot';

declare const ALLOWED_METHODS: readonly ["GET", "PUT", "POST", "DELETE", "OPTIONS", "HEAD", "PATCH", "TRACE"];
type AllowedMethod = (typeof ALLOWED_METHODS)[number];
type ApenApiHttpMethods = "ALL" | OpenAPIRoute["method"];
type ReponseParams = {
    [key: number]: EnhancedResponseObject | OpenAPIV3.ReferenceObject;
};
type OpenApiRoute = {
    path?: `/${string}`;
    routeOptions: DescribeRouteOptions;
};
/** Configuration for generating documentation from a route spec */
type DescribeRouteOptions = Omit<OpenAPIV3.OperationObject, "requestBody" | "responses"> & {
    /**
     * Pass `true` to hide route from OpenAPI/swagger document
     */
    hide?: boolean;
    method?: "ALL" | OpenAPIRoute["method"];
    /**
     * Request body
     */
    requestBody?: EnhancedRequestObject | OpenAPIV3.ReferenceObject;
    /**
     * Responses of the request
     */
    responses?: ReponseParams;
    /**
     * Validate response of the route
     * @experimental
     */
    validateResponse?: boolean;
};
/** Enhanced OpenAPI response container, allows passing Valibot schemas as the schema value */
type EnhancedContentData = {
    content?: {
        [media: string]: EnhancedMediaTypeObject | OpenAPIV3.MediaTypeObject;
    };
};
type EnhancedMediaTypeObject = Omit<OpenAPIV3.MediaTypeObject, "schema"> & {
    schema?: BaseSchema<unknown, unknown, BaseIssue<unknown>> | OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | ResolverResult;
};
/** OpenAPIV3 Request object that supports valibot schema */
type EnhancedRequestObject = EnhancedContentData & OpenAPIV3.RequestBodyObject;
/** OpenAPIV3 Response object that supports valibot schema */
type EnhancedResponseObject = EnhancedContentData & Omit<OpenAPIV3.ResponseObject, "content">;
type HandlerResponse = {
    metadata?: Record<string, unknown>;
    resolver: (config: OpenAPIRouteHandlerConfig) => PromiseOr<{
        components?: OpenAPIV3.ComponentsObject["schemas"];
        docs: OpenAPIV3.OperationObject;
    }>;
};
type HasUndefined<T> = undefined extends T ? true : false;
interface OpenAPIRoute {
    data: OpenAPIV3.OperationObject;
    method: AllowedMethod;
    path: string;
}
type OpenAPIRouteHandlerConfig = {
    [key: string]: unknown;
} & {
    components: OpenAPIV3.ComponentsObject["schemas"];
    version: "3.0.0" | "3.0.1" | "3.0.2" | "3.0.3" | "3.1.0";
};
type OpenApiSpecsOptions = {
    /**
     * Customize OpenAPI config, refers to Swagger 2.0 config
     *
     * @see https://swagger.io/specification/v2/
     */
    documentation?: Omit<Partial<OpenAPIV3.Document>, "x-express-openapi-additional-middleware" | "x-express-openapi-validation-strict">;
    /**
     * Paths to exclude from OpenAPI endpoint
     *
     * @default []
     */
    exclude?: Array<RegExp | string> | RegExp | string;
    /**
     * Exclude methods from Open API
     */
    excludeMethods?: AllowedMethod[];
    /**
     * Determine if Swagger should exclude static files.
     *
     * @default true
     */
    excludeStaticFile?: boolean;
    /**
     * Exclude tags from OpenAPI
     */
    excludeTags?: string[];
};
type PromiseOr<T> = Promise<T> | T;
type ResolverResult = {
    builder: (options?: OpenAPIRouteHandlerConfig) => PromiseOr<{
        components?: OpenAPIV3.ComponentsObject["schemas"];
        schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
    }>;
    validator: (values: unknown) => PromiseOr<void>;
};

export { ALLOWED_METHODS, type AllowedMethod, type ApenApiHttpMethods, type DescribeRouteOptions, type EnhancedContentData, type EnhancedMediaTypeObject, type EnhancedRequestObject, type EnhancedResponseObject, type HandlerResponse, type HasUndefined, type OpenAPIRoute, type OpenAPIRouteHandlerConfig, type OpenApiRoute, type OpenApiSpecsOptions, type PromiseOr, type ReponseParams, type ResolverResult };
