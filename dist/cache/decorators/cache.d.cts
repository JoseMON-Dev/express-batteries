import { SetTTL, SetGuards, SetCommonOptions } from '../types/cache.config.cjs';

type GenerateKeyFunction = (methodName: string, args: any[]) => string;
declare function cached(options: SetTTL & SetGuards & SetCommonOptions, cacheKeyGenerator?: GenerateKeyFunction): MethodDecorator;

export { cached };
