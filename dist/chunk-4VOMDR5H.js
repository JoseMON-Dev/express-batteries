import {
  addValidationMiddleware
} from "./chunk-COOCB44X.js";
import {
  paramsMetadata
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

// src/decorators/routes/validators/Params.ts
function Params(schema) {
  return (target, propertyKey) => {
    paramsMetadata.addRouteParams(schema, target, propertyKey);
    addValidationMiddleware(target, propertyKey);
    const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
      target,
      propertyKey
    );
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
    const openApiInfo = {
      ...routesOpenApiInfo || {},
      routeOptions: {
        ...routesOpenApiInfo?.routeOptions || {},
        responses: baseResponses
      }
    };
    routeMetadata.saveRoutesOpenApiInfo(openApiInfo, target, propertyKey);
  };
}

export {
  Params
};
