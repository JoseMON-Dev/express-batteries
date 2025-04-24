import { cacheMetadata } from "../meta/cache";
import type {
    ICacheManager,
    SetCommonOptions,
    SetGuards,
    SetTTL,
} from "../types";

type GenerateKeyFunction = (
    methodName: string,
    args: any[],
) => string;

export function cached(
    options: SetTTL & SetGuards & SetCommonOptions,
    cacheKeyGenerator?: GenerateKeyFunction,
): MethodDecorator {
    return function (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;
        const isAsync = originalMethod.constructor.name === "AsyncFunction";
        const methodName = propertyKey.toString();

        const generateKey = cacheKeyGenerator ??
            ((method, args) =>
                `${target.constructor.name}:${method}:${JSON.stringify(args)}`);

        if (!isAsync) {
            throw new Error(
                "Synchronous methods are not supported for caching.",
            );
        }

        descriptor.value = async function (...args: any[]) {
            const cacheManager: ICacheManager = cacheMetadata.getCacheManager();
            const cacheKey = generateKey(methodName, args);
            const cachedValue = await cacheManager.get(cacheKey);

            if (cachedValue !== undefined && cachedValue !== null) {
                if (process.env.NODE_ENV !== "production") {
                    console.log(`[CACHE HIT] ${cacheKey}`);
                }
                return cachedValue;
            }

            if (process.env.NODE_ENV !== "production") {
                console.log(`[CACHE MISS] ${cacheKey}`);
            }

            const result = await originalMethod.apply(this, args);
            if (result !== undefined && result !== null) {
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
            descriptor.value,
        );

        return descriptor;
    };
}
