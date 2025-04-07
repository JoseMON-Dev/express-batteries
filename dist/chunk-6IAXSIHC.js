import {
  bodyMetadata,
  paramsMetadata,
  queryMetadata
} from "./chunk-SRWPSQDJ.js";
import {
  requestValidator
} from "./chunk-NWH2KRCR.js";

// src/meta/decorators/route/functions.ts
function createValidationRequestMiddleware(target, propertyKey) {
  const bodySchema = bodyMetadata.getRouteBody(target, propertyKey);
  const paramsSchema = paramsMetadata.getRouteParams(target, propertyKey);
  const querySchema = queryMetadata.getRouteQuery(target, propertyKey);
  const handler = requestValidator({
    bodySchema,
    paramsSchema,
    querySchema
  });
  return handler;
}

export {
  createValidationRequestMiddleware
};
