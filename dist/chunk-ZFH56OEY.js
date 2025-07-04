import {
  addValidationMiddleware
} from "./chunk-SAAJ2WJQ.js";
import {
  bodyMetadata
} from "./chunk-SRWPSQDJ.js";
import {
  routeMetadata
} from "./chunk-4M4IRHAX.js";
import {
  descriptionHttpCode
} from "./chunk-2WIR5VWA.js";
import {
  expressBatteriesConfig
} from "./chunk-MDVVPD6L.js";

// src/decorators/routes/validators/Body.ts
function Body(schema) {
  const headers = ["application/json"];
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
    const c = {};
    const list = Array.isArray(headers) ? headers : [headers];
    list.forEach((h) => {
      c[h] = {
        schema
      };
    });
    bodyMetadata.addRouteBody(schema, target, propertyKey);
    addValidationMiddleware(target, propertyKey);
    baseRouteOptions.requestBody = {
      content: c
    };
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
