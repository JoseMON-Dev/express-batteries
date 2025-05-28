import { CorsOptions } from 'cors';
import { ICacheManager } from '../cache/types/cacheManager.cjs';
import '../cache/types/cache.config.cjs';

type OptionalElement = any | undefined;
type RestParams = any[] | undefined[] | OptionalElement;
type ErrorClass = new (message: string, errors: string[], code: number, ...rest: RestParams) => Error & {
    toJson(): object;
};
type SslOptions = {
    key: Buffer;
    cert: Buffer;
};
type ExpressBatteriesConfig = {
    ErrorClass?: ErrorClass | undefined;
    cors?: CorsOptions;
    cacheManager?: ICacheManager;
    https?: SslOptions | undefined | null;
};

export type { ErrorClass, ExpressBatteriesConfig, OptionalElement, RestParams, SslOptions };
