import type {
    ErrorMessage,
    ObjectEntries,
    ObjectIssue,
    ObjectSchema,
} from "valibot";
import { routeMetadata } from "../../../meta/decorators/route/route";
import { addValidationMiddleware } from "../../../meta/decorators/validators/functions";
import { queryMetadata } from "../../../meta/decorators/validators/validators";
import { descriptionHttpCode } from "../../../meta/httpCodes";
import { describeSetting } from "../../../functions/describeSetting";
import type { OpenApiRoute } from "../../../types/openApi";
import { expressBatteriesConfig } from "../../../meta";

export function Query<T extends ObjectEntries>(
    schema: ObjectSchema<T, ErrorMessage<ObjectIssue> | undefined>,
): MethodDecorator {
    return (target, propertyKey) => {
        queryMetadata.addRouteQuery(
            schema,
            target,
            propertyKey!,
        );
        addValidationMiddleware(target, propertyKey);

        const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
            target,
            propertyKey,
        );
        const queryParams = (Object.keys(
            schema.entries,
        ) as (keyof typeof schema.entries)[]).map((key) => ({
            in: "query",
            name: describeSetting(key),
        }));

        const baseResponses = {
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

        const baseParameters: OpenApiRoute["routeOptions"]["parameters"] = [
            ...(routesOpenApiInfo?.routeOptions?.parameters || []),
            ...queryParams,
        ];

        const openApiInfo: OpenApiRoute = {
            ...(routesOpenApiInfo || {}),
            routeOptions: {
                ...(routesOpenApiInfo?.routeOptions || {}),
                parameters: baseParameters,
                responses: baseResponses,
            },
        };

        routeMetadata.saveRoutesOpenApiInfo(openApiInfo, target, propertyKey);
    };
}
