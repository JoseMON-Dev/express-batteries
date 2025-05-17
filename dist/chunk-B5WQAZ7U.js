import {
  addValidationMiddleware
} from "./chunk-TLUQBE5J.js";
import {
  queryMetadata
} from "./chunk-SRWPSQDJ.js";
import {
  routeMetadata
} from "./chunk-4M4IRHAX.js";
import {
  descriptionHttpCode
} from "./chunk-2WIR5VWA.js";
import {
  expressBatteriesConfig
} from "./chunk-UVSNYCVZ.js";
import {
  describeSetting
} from "./chunk-SSYN7GUO.js";

// src/decorators/routes/validators/Query.ts
function Query(schema) {
  return (target, propertyKey) => {
    queryMetadata.addRouteQuery(
      schema,
      target,
      propertyKey
    );
    addValidationMiddleware(target, propertyKey);
    const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
      target,
      propertyKey
    );
    const queryParams = Object.keys(
      schema.entries
    ).map((key) => ({
      in: "query",
      name: describeSetting(key)
    }));
    const baseResponses = {
      400: {
        description: descriptionHttpCode[400],
        content: {
          "application/json": {
            schema: expressBatteriesConfig.getErrorSchema()
          }
        }
      },
      ...routesOpenApiInfo?.routeOptions?.responses || {}
    };
    const baseParameters = [
      ...routesOpenApiInfo?.routeOptions?.parameters || [],
      ...queryParams
    ];
    const openApiInfo = {
      ...routesOpenApiInfo || {},
      routeOptions: {
        ...routesOpenApiInfo?.routeOptions || {},
        parameters: baseParameters,
        responses: baseResponses
      }
    };
    routeMetadata.saveRoutesOpenApiInfo(openApiInfo, target, propertyKey);
  };
}

export {
  Query
};
