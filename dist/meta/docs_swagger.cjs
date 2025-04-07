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

// src/meta/docs_swagger.ts
var docs_swagger_exports = {};
__export(docs_swagger_exports, {
  SWAGGER_DOC: () => SWAGGER_DOC
});
module.exports = __toCommonJS(docs_swagger_exports);
var import_valibot_openapi_generator = require("@camflan/valibot-openapi-generator");
var SWAGGER_DOC = [];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SWAGGER_DOC
});
