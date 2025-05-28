import {
  cacheMetadata
} from "./chunk-6TSO7Q7V.js";

// src/cache/decorators/cache.ts
function cached(options, cacheKeyGenerator) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    const isAsync = originalMethod.constructor.name === "AsyncFunction";
    const methodName = propertyKey.toString();
    const generateKey = cacheKeyGenerator ?? ((method, args) => `${target.constructor.name}:${method}:${JSON.stringify(args)}`);
    if (!isAsync) {
      throw new Error(
        "Synchronous methods are not supported for caching."
      );
    }
    descriptor.value = async function(...args) {
      const cacheManager = cacheMetadata.getCacheManager();
      const cacheKey = generateKey(methodName, args);
      const cachedValue = await cacheManager.get(cacheKey);
      if (cachedValue !== void 0 && cachedValue !== null) {
        if (process.env.NODE_ENV !== "production") {
          console.log(`[CACHE HIT] ${cacheKey}`);
        }
        return cachedValue;
      }
      if (process.env.NODE_ENV !== "production") {
        console.log(`[CACHE MISS] ${cacheKey}`);
      }
      const result = await originalMethod.apply(this, args);
      if (result !== void 0 && result !== null) {
        await cacheManager.set(cacheKey, result, options);
        if (process.env.NODE_ENV !== "production") {
          console.log(`[CACHE SET] ${cacheKey}`);
        }
      }
      return result;
    };
    cacheMetadata.setCachedFunction(
      target.constructor,
      propertyKey,
      descriptor.value
    );
    return descriptor;
  };
}

export {
  cached
};
