import { cacheMetadata } from "../meta/cache";

type KeyGenerator = (methodName: string, args: any[]) => string | string[];

export function invalidateCache(
    keyOrPattern: string | KeyGenerator,
): MethodDecorator {
    return function (
        _: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;
        const methodName = propertyKey.toString();

        const generateKeys = (args: any[]): string[] => {
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
                "Synchronous methods are not supported for cache invalidation.",
            );
        }
        descriptor.value = async function (...args: any[]) {
            const cacheManager = cacheMetadata.getCacheManager();
            const keys = generateKeys(args);

            for (const key of keys) {
                const deleted = await cacheManager.delete(key);
                if (deleted) {
                    if (process.env.NODE_ENV !== "production") {
                        console.log(`[CACHE INVALIDATED] ${key}`);
                    }
                }
            }
            const result = await originalMethod.apply(this, args);

            return result;
        };

        return descriptor;
    };
}
