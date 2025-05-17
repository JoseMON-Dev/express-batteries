"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/plugin.ts
var plugin_exports = {};
__export(plugin_exports, {
  default: () => transformer
});
module.exports = __toCommonJS(plugin_exports);
var import_typescript = __toESM(require("typescript"), 1);
function transformer(program) {
  return (context) => {
    const visitor = (node) => {
      if (import_typescript.default.isCallExpression(node)) {
        if (import_typescript.default.isPropertyAccessExpression(node.expression) && import_typescript.default.isIdentifier(node.expression.expression) && node.expression.expression.text === "ExpressBatteriesTs" && node.expression.name.text === "name") {
          if (node.typeArguments && node.typeArguments.length === 1) {
            const typeArg = node.typeArguments[0];
            if (import_typescript.default.isTypeReferenceNode(typeArg) && import_typescript.default.isIdentifier(typeArg.typeName)) {
              const typeName = typeArg.typeName.text;
              return import_typescript.default.factory.createStringLiteral(typeName);
            }
          }
        }
      }
      return import_typescript.default.visitEachChild(node, visitor, context);
    };
    return (node) => import_typescript.default.visitNode(node, visitor);
  };
}
