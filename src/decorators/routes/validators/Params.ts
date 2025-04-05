import type {
    ErrorMessage,
    ObjectEntries,
    ObjectIssue,
    ObjectSchema,
} from "valibot";
import { addValidationMiddleware } from "../../../meta/decorators/validators/functions";
import { descriptionHttpCode } from "../../../meta/httpCodes";
import { paramsMetadata } from "../../../meta/decorators/validators/validators";
import { routeMetadata } from "../../../meta/decorators/route/route";
import type { OpenApiRoute } from "../../../types/openApi";
import { expressBatteriesConfig } from "../../../meta";

export function Params<T extends ObjectEntries>(
    schema: ObjectSchema<T, ErrorMessage<ObjectIssue> | undefined>,
): MethodDecorator {
    return (target, propertyKey) => {
        paramsMetadata.addRouteParams(schema, target, propertyKey);
        addValidationMiddleware(target, propertyKey);
        const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
            target,
            propertyKey,
        );
        const baseResponses: OpenApiRoute["routeOptions"]["responses"] = {
            400: {
                description: descriptionHttpCode[400],
                content: {
                    "application/json": {
                        schema: expressBatteriesConfig.getErrorSchema(),
                    },
                },
            },
            ...(routesOpenApiInfo?.routeOptions?.responses || {}),
        };

        const openApiInfo: OpenApiRoute = {
            ...(routesOpenApiInfo || {}),
            routeOptions: {
                ...(routesOpenApiInfo?.routeOptions || {}),
                responses: baseResponses,
            },
        };

        routeMetadata.saveRoutesOpenApiInfo(openApiInfo, target, propertyKey);
    };
}
