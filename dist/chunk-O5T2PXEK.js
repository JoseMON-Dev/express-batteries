import {
  ApiError
} from "./chunk-YIHLBXI6.js";

// src/meta/config.ts
import toJsonSchema from "to-json-schema";
var baseConfig = {
  ErrorClass: ApiError
};
var globalConfig = { ...baseConfig };
var expressBatteriesConfig = {
  setConfig: (config) => {
    if (config) {
      globalConfig = { ...globalConfig, ...config };
    }
  },
  getConfig: () => globalConfig,
  getErrorSchema: () => {
    const Error = expressBatteriesConfig.getConfig().ErrorClass;
    const instance = new Error("error", ["erer", "sdsd"], 200);
    return toJsonSchema(
      instance.toJson()
    );
  }
};

export {
  expressBatteriesConfig
};
