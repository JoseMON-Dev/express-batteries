import {
  controllerMetadata
} from "./chunk-RORZUQNO.js";
import {
  SWAGGER_DOC
} from "./chunk-IK5VUQLJ.js";

// src/decorators/routes/Controller.ts
import {
  describeRoute
} from "@camflan/valibot-openapi-generator";
function Controller(path) {
  return (target) => {
    const router = controllerMetadata.getRouter(target);
    controllerMetadata.setPath(target, path);
    if (!router) {
      throw new Error(`Controller ${target.name} needs a route`);
    }
    const proto = target.prototype;
    proto.___setUp___ = (app, basePath, container) => {
      controllerMetadata.setIocContainer(target, container);
      const fullPath = `${basePath}${path ? path : ""}`;
      const routesInfo = controllerMetadata.getControllerRoutesInfo(
        target
      );
      routesInfo.forEach((r) => {
        const p = `${fullPath}${r.path}`;
        SWAGGER_DOC.push(
          describeRoute(p, r.routeOptions)
        );
      });
      const middlewares = controllerMetadata.getControllerMiddlewares(target);
      if (middlewares.length) {
        app.use(fullPath, ...middlewares);
      }
      app.use(fullPath, router);
    };
    return target;
  };
}

export {
  Controller
};
