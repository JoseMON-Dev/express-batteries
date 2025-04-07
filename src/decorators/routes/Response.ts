import type { OpenAPIV3 } from "openapi-types";
import { routeMetadata } from "../../meta/decorators/route/route";
import { descriptionHttpCode } from "../../meta/httpCodes";
import type { HttpMethodNumber } from "../../types/httpMethodNumer";
import type {
    EnhancedMediaTypeObject,
    ReponseParams,
} from "../../types/openApi";
import toJsonSchema from "to-json-schema";
import type { RequestValidationSchema } from "../../types/requestValidationSchema";
import { isValibotSchema } from "../../functions/isValibotSchema";
import cleanDeep from "clean-deep";
import type { FileMimeType } from "../../types";

export interface ResponseTypeProps {
    code: HttpMethodNumber;
    description?: string;
    schema?: object | RequestValidationSchema;
    headers?: FileMimeType[];
}

export const ResponseType = (
    { code, description, schema, headers }: ResponseTypeProps,
): MethodDecorator => {
    const obj = schema;
    const responses: ReponseParams = {};
    let content: {
        [media: string]: OpenAPIV3.MediaTypeObject | EnhancedMediaTypeObject;
    } | undefined;
    if (obj) {
        const head = headers || ["application/json"];
        const schema = isValibotSchema(obj)
            ? obj
            : JSON.parse(JSON.stringify(toJsonSchema(obj)));
        content = head.reduce((acc, head) => {
            acc[head] = {
                schema: schema as any,
            };
            return acc;
        }, {} as Record<string, { schema: any }>);
    }
    if (content) {
        responses[code] = {
            description: description || descriptionHttpCode[code],
            content,
        };
    } else {
        responses[code] = {
            description: description || descriptionHttpCode[code],
            content: headers
                ? headers.reduce((acc, head) => {
                    acc[head] = {
                        schema: schema as any,
                    };
                    return acc;
                }, {} as Record<string, { schema: any }>) as any
                : undefined,
        };
    }

    return (target: object, propertyKey: string | symbol): void => {
        const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
            target,
            propertyKey,
        );
        const cleanedResponses = cleanDeep(responses, {
            emptyArrays: false,
            emptyObjects: false,
            emptyStrings: false,
        }) as any;
        if (routesOpenApiInfo) {
            routeMetadata.saveRoutesOpenApiInfo(
                {
                    ...routesOpenApiInfo,
                    routeOptions: {
                        ...routesOpenApiInfo.routeOptions,
                        responses: {
                            ...routesOpenApiInfo.routeOptions.responses,
                            ...cleanedResponses,
                        },
                    },
                },
                target,
                propertyKey,
            );
        } else {
            routeMetadata.saveRoutesOpenApiInfo(
                {
                    routeOptions: {
                        responses: { ...cleanedResponses },
                    },
                },
                target,
                propertyKey,
            );
        }
    };
};
