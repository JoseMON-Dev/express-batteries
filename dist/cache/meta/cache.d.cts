import { ICacheManager } from '../types/cacheManager.cjs';
import '../types/cache.config.cjs';

declare const cacheMetadata: {
    METHOD_CACHE: string;
    getCacheManager: () => ICacheManager;
    setCachedFunction: (target: Function, propertyKey: string | symbol, fn: Function) => void;
    getCachedFunction: (target: Function, propertyKey: string | symbol) => Function | undefined;
};

export { cacheMetadata };
