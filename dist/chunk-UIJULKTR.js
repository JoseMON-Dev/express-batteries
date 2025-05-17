import {
  cacheMetadata
} from "./chunk-7V6XCOFL.js";

// src/cache/decorators/invalidateCache.ts
function invalidateCache(keyOrPattern) {
  return function(_, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    const methodName = propertyKey.toString();
    const generateKeys = (args) => {
      if (typeof keyOrPattern === "string") {
        return [keyOrPattern];
      } else {
        const result = keyOrPattern(methodName, args);
        return Array.isArray(result) ? result : [result];
      }
    };
    const isAsync = originalMethod.constructor.name === "AsyncFunction";
    if (!isAsync) {
      throw new Error(
        "Synchronous methods are not supported for cache invalidation."
      );
    }
    descriptor.value = async function(...args) {
      const cacheManager = cacheMetadata.getCacheManager();
      const keys = generateKeys(args);
      for (const key of keys) {
        const cacheKeys = await cacheManager.keys(key);
        const deleted = await cacheManager.delete(cacheKeys);
        if (deleted) {
          if (process.env.NODE_ENV !== "production") {
            console.log(
              `[CACHE INVALIDATED] pattern ${key} cacheKeys: 
 ${cacheKeys}`
            );
          }
        }
      }
      const result = await originalMethod.apply(this, args);
      return result;
    };
    return descriptor;
  };
}

export {
  invalidateCache
};
