import toJsonSchema from "to-json-schema";
import type {
  ErrorMessage,
  ObjectEntries,
  ObjectIssue,
  ObjectSchema,
} from "valibot";
import { descriptionHttpCode } from "../../../meta/httpCodes";
import { DECORATORS_METADATA_KEYS } from "../../../meta/decorators.metadata";
import { addValidationMiddleware } from "../../../meta/decorators/validators/functions";
import { routeMetadata } from "../../../meta/decorators/route/route";
import type { OpenApiRoute } from "../../../types/openApi";
import { bodyMetadata } from "../../../meta/decorators/validators/validators";

export function Body<T extends ObjectEntries>(
  schema: ObjectSchema<T, ErrorMessage<ObjectIssue> | undefined>,
): MethodDecorator {
  return (target, propertyKey) => {
    bodyMetadata.addRouteBody(
      schema,
      target,
      propertyKey,
    );
    addValidationMiddleware(target, propertyKey);

    const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
      target,
      propertyKey,
    );

    const baseRouteOptions: OpenApiRoute["routeOptions"] = {
      requestBody: {
        content: {
          "application/json": {
            schema: schema,
          },
        },
      },
      responses: {
        400: {
          description: descriptionHttpCode[400],
        },
        ...(routesOpenApiInfo?.routeOptions?.responses || {}),
      },
    };

    const openApiInfo: OpenApiRoute = routesOpenApiInfo
      ? {
        ...routesOpenApiInfo,
        routeOptions: {
          ...routesOpenApiInfo.routeOptions,
          ...baseRouteOptions,
        },
      }
      : {
        routeOptions: baseRouteOptions,
      };

    routeMetadata.saveRoutesOpenApiInfo(openApiInfo, target, propertyKey);
  };
}
