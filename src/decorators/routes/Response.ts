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
    header?: FileMimeType;
}

export const ResponseType = (
    { code, description, schema, header }: ResponseTypeProps,
): MethodDecorator => {
    const obj = schema;
    const responses: ReponseParams = {};
    let content: {
        [media: string]: OpenAPIV3.MediaTypeObject | EnhancedMediaTypeObject;
    } | undefined;
    if (obj) {
        const head = header || "application/json";
        const schema = isValibotSchema(obj) ? obj : toJsonSchema(obj);
        content = {
            [head]: {
                schema: schema as any,
            },
        };
    }
    if (content) {
        responses[code] = {
            description: description || descriptionHttpCode[code],
            content,
        };
    } else {
        responses[code] = {
            description: description || descriptionHttpCode[code],
            content: header ? { [header]: toJsonSchema({}) } as any : undefined,
        };
    }

    return (target: object, propertyKey: string | symbol): void => {
        const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
            target,
            propertyKey,
        );
        if (routesOpenApiInfo) {
            routeMetadata.saveRoutesOpenApiInfo(
                {
                    ...routesOpenApiInfo,
                    routeOptions: {
                        ...routesOpenApiInfo.routeOptions,
                        responses: {
                            ...routesOpenApiInfo.routeOptions.responses,
                            ...responses,
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
                        responses: cleanDeep(responses, {
                            emptyArrays: false,
                            emptyObjects: false,
                            emptyStrings: false,
                        }) as any,
                    },
                },
                target,
                propertyKey,
            );
        }
    };
};
