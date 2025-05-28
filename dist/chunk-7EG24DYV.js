import {
  controllerMetadata
} from "./chunk-RORZUQNO.js";
import {
  routeMetadata
} from "./chunk-4M4IRHAX.js";

// src/decorators/routes/Middleware.ts
function Middleware(middleware) {
  return (target, propertyKey) => {
    routeMetadata.addRouteMiddleware(target, propertyKey, middleware);
  };
}
function Middlewares(...middlewares) {
  return (target, propertyKey) => {
    if (propertyKey) {
      middlewares.forEach((middleware) => {
        routeMetadata.addRouteMiddleware(
          target,
          propertyKey,
          middleware
        );
      });
    } else {
      controllerMetadata.addControllerMiddleware(target, middlewares);
    }
  };
}

export {
  Middleware,
  Middlewares
};
