"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/functions/index.ts
var functions_exports = {};
__export(functions_exports, {
  describeSetting: () => describeSetting,
  isValibotSchema: () => isValibotSchema,
  parse: () => parse,
  setUpControllers: () => setUpControllers
});
module.exports = __toCommonJS(functions_exports);

// src/functions/isValibotSchema.ts
function isValibotSchema(obj) {
  return obj.kind === "schema";
}

// src/functions/setUpControllers.ts
var import_express = require("express");
var import_inversify = require("inversify");

// src/types/DevpsSymbols.ts
var ControllerSymbol = Symbol.for("Controller");

// src/functions/setUpControllers.ts
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

// src/functions/parse.ts
var import_valibot = require("valibot");
var parse = (schema, data) => {
  const errors = [];
  const result = (0, import_valibot.safeParse)(schema, data);
  if (!result.success) {
    errors.push(...result.issues.map((issue) => issue.message));
    return { success: false, errors, data: {} };
  }
  return { success: true, errors, data };
};

// src/functions/describeSetting.ts
function describeSetting(setting) {
  if (typeof setting === "string") {
    return setting;
  }
  if (typeof setting === "number") {
    return `${setting}`;
  }
  return `${String(setting.description ?? setting.toString())}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  describeSetting,
  isValibotSchema,
  parse,
  setUpControllers
});
