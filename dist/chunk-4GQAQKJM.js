import {
  addValidationMiddleware
} from "./chunk-26VT6BCW.js";
import {
  bodyMetadata
} from "./chunk-IDLPKG6X.js";
import {
  routeMetadata
} from "./chunk-4M4IRHAX.js";
import {
  expressBatteriesConfig
} from "./chunk-O5T2PXEK.js";
import {
  descriptionHttpCode
} from "./chunk-2WIR5VWA.js";

// src/decorators/routes/validators/Body.ts
function Body(schema) {
  return (target, propertyKey) => {
    const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
      target,
      propertyKey
    );
    const baseRouteOptions = {
      responses: {
        400: {
          description: descriptionHttpCode[400],
          content: {
            "application/json": {
              schema: expressBatteriesConfig.getErrorSchema()
            }
          }
        },
        ...routesOpenApiInfo?.routeOptions?.responses || {}
      }
    };
    if (typeof schema === "string") {
      baseRouteOptions.requestBody = {
        content: {
          [schema]: {
            schema: {
              type: "object",
              properties: {
                file: {
                  type: "string",
                  format: "binary"
                }
              }
            }
          }
        }
      };
    } else {
      bodyMetadata.addRouteBody(schema, target, propertyKey);
      addValidationMiddleware(target, propertyKey);
      baseRouteOptions.requestBody = {
        content: {
          "application/json": {
            schema
          }
        }
      };
    }
    const openApiInfo = routesOpenApiInfo ? {
      ...routesOpenApiInfo,
      routeOptions: {
        ...routesOpenApiInfo.routeOptions,
        ...baseRouteOptions
      }
    } : {
      routeOptions: baseRouteOptions
    };
    routeMetadata.saveRoutesOpenApiInfo(openApiInfo, target, propertyKey);
  };
}

export {
  Body
};
