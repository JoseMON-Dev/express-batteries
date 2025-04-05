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

export const ResponseType = (
    code: HttpMethodNumber,
    description?: string,
    obj?: object | RequestValidationSchema,
): MethodDecorator => {
    const responses: ReponseParams = {};
    let content: {
        [media: string]: OpenAPIV3.MediaTypeObject | EnhancedMediaTypeObject;
    } | undefined;
    if (obj) {
        const schema = isValibotSchema(obj) ? obj : toJsonSchema(obj);
        content = {
            "application/json": {
                schema: schema as any,
            },
        };
    }
    responses[code] = {
        description: description || descriptionHttpCode[code],
        content: content,
    };
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
                        responses: responses,
                    },
                },
                target,
                propertyKey,
            );
        }
    };
};
