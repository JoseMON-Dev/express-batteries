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

// src/decorators/ioc/Module.ts
var Module_exports = {};
__export(Module_exports, {
  CreateModule: () => CreateModule
});
module.exports = __toCommonJS(Module_exports);
var import_inversify = require("inversify");

// src/types/DevpsSymbols.ts
var ControllerSymbol = Symbol.for("Controller");

// src/decorators/ioc/Module.ts
function CreateModule({
  controllers,
  services,
  path,
  app,
  dependencyLoaders
}) {
  const container = new import_inversify.Container();
  dependencyLoaders?.forEach((fn) => {
    fn(container);
  });
  services?.forEach((service) => {
    Array.isArray(service) ? container.bind(service[0]).to(service[1]) : container.bind(service).to(service);
  });
  controllers.forEach((c) => {
    container.bind(ControllerSymbol).to(
      c
    ).inSingletonScope();
  });
  container.getAll(ControllerSymbol).forEach((c) => {
    c.___setUp___(app, path, container);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateModule
});
