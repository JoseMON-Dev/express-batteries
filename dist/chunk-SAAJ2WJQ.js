import {
  createValidationRequestMiddleware
} from "./chunk-HOAK4ZF2.js";
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
