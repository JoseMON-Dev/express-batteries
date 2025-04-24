import { expressBatteriesConfig } from "../../meta/config";

export const cacheMetadata = {
    METHOD_CACHE: "cache_method_metadata_function",
    getCacheManager: () => {
        return expressBatteriesConfig.getCacheManager();
    },

    setCachedFunction: (
        target: Function,
        propertyKey: string | symbol,
        fn: Function,
    ) => {
        Reflect.defineMetadata(
            cacheMetadata.METHOD_CACHE,
            fn,
            target,
            propertyKey,
        );
    },

    getCachedFunction: (
        target: Function,
        propertyKey: string | symbol,
    ): Function | undefined => {
        return Reflect.getMetadata(
            cacheMetadata.METHOD_CACHE,
            target,
            propertyKey,
        );
    },
};
