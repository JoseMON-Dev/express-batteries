import {
  ControllerSymbol
} from "./chunk-TBVPSSES.js";

// src/functions/setUpControllers.ts
import "express";
import "inversify";
var setUpControllers = (app, container, path) => {
  const controllers = container.getAll(
    ControllerSymbol
  );
  controllers.forEach((controller) => {
    if (!controller.___setUp___) {
      throw new Error(
        "Controller must have @Controller decorator, controller: " + controller.constructor.name
      );
    }
    controller.___setUp___(app, path, container);
  });
  return app;
};

export {
  setUpControllers
};
