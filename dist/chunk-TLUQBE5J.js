import {
  createValidationRequestMiddleware
} from "./chunk-I3PFFEAQ.js";
import {
  routeMetadata
} from "./chunk-4M4IRHAX.js";

// src/meta/decorators/validators/functions.ts
function addValidationMiddleware(target, propertyKey) {
  routeMetadata.addRouteMiddleware(
    target,
    propertyKey,
    createValidationRequestMiddleware(target, propertyKey)
  );
}

export {
  addValidationMiddleware
};
