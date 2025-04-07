import type {
  BaseSchema,
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
import { expressBatteriesConfig } from "../../../meta";

export type BodyObjectHEaders =
  | "application/json"
  | "application/xml"
  | "text/xml"
  | "text/csv"
  | (string & {});

export function Body<T extends ObjectEntries>(
  schema: ObjectSchema<T, ErrorMessage<ObjectIssue> | undefined>,
): MethodDecorator {
  const headers = ["application/json"];
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

    const c = {} as any;
    const list = Array.isArray(headers) ? headers : [headers];
    list.forEach((h) => {
      c[h] = {
        schema: schema,
      };
    });

    bodyMetadata.addRouteBody(schema, target, propertyKey);
    addValidationMiddleware(target, propertyKey);
    baseRouteOptions.requestBody = {
      content: c,
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
