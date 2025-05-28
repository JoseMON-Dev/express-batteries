import {
  expressBatteriesConfig
} from "./chunk-MDVVPD6L.js";

// src/cache/meta/cache.ts
var cacheMetadata = {
  METHOD_CACHE: "cache_method_metadata_function",
  getCacheManager: () => {
    return expressBatteriesConfig.getCacheManager();
  },
  setCachedFunction: (target, propertyKey, fn) => {
    Reflect.defineMetadata(
      cacheMetadata.METHOD_CACHE,
      fn,
      target,
      propertyKey
    );
  },
  getCachedFunction: (target, propertyKey) => {
    return Reflect.getMetadata(
      cacheMetadata.METHOD_CACHE,
      target,
      propertyKey
    );
  }
};

export {
  cacheMetadata
};
