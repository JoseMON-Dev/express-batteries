import {
  createValidationRequestMiddleware
} from "./chunk-FKMTN4DR.js";
import {
  routeMetadata
} from "./chunk-4M4IRHAX.js";
import {
  DECORATORS_METADATA_KEYS
} from "./chunk-L5HOEFIA.js";

// src/meta/decorators/validators/functions.ts
function addValidationMiddleware(target, propertyKey) {
  const haveValidation = Reflect.getMetadata(
    DECORATORS_METADATA_KEYS.HAVE_VALIDATION,
    target,
    propertyKey
  );
  if (!haveValidation) {
    Reflect.defineMetadata(
      DECORATORS_METADATA_KEYS.HAVE_VALIDATION,
      true,
      target,
      propertyKey
    );
    routeMetadata.addRouteMiddleware(
      target,
      propertyKey,
      createValidationRequestMiddleware(target, propertyKey)
    );
  }
}

export {
  addValidationMiddleware
};
