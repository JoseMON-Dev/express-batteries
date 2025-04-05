import type {
  ErrorMessage,
  ObjectEntries,
  ObjectIssue,
  ObjectSchema,
} from "valibot";
import { descriptionHttpCode } from "../../../meta/httpCodes";
import { addValidationMiddleware } from "../../../meta/decorators/validators/functions";
import { routeMetadata } from "../../../meta/decorators/route/route";
import type { OpenApiRoute } from "../../../types/openApi";
import { bodyMetadata } from "../../../meta/decorators/validators/validators";
import type { FileMimeType } from "../../../types";
import { expressBatteriesConfig } from "../../../meta";

export function Body<T extends ObjectEntries>(
  schema: ObjectSchema<T, ErrorMessage<ObjectIssue> | undefined> | FileMimeType,
): MethodDecorator {
  return (target, propertyKey) => {
    const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
      target,
      propertyKey,
    );

    const baseRouteOptions: OpenApiRoute["routeOptions"] = {
      responses: {
        400: {
          description: descriptionHttpCode[400],
          content: {
            "application/json": {
              schema: expressBatteriesConfig.getErrorSchema(),
            },
          },
        },
        ...(routesOpenApiInfo?.routeOptions?.responses || {}),
      },
    };

    if (typeof schema === "string") {
      // FileMimeType
      baseRouteOptions.requestBody = {
        content: {
          [schema]: {
            schema: {
              type: "object",
              properties: {
                file: {
                  type: "string",
                  format: "binary",
                },
              },
            },
          },
        },
      };
    } else {
      bodyMetadata.addRouteBody(schema, target, propertyKey);
      addValidationMiddleware(target, propertyKey);

      baseRouteOptions.requestBody = {
        content: {
          "application/json": {
            schema: schema,
          },
        },
      };
    }

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
