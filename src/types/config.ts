import type { CorsOptions } from "cors";
import type { ICacheManager } from "../cache";

export type OptionalElement = any | undefined;
export type RestParams = any[] | undefined[] | OptionalElement;
export type ErrorClass = new (
    message: string,
    errors: string[],
    code: number,
    ...rest: RestParams
) => Error & {
    toJson(): object;
};

export type ExpressBatteriesConfig = {
    ErrorClass?: ErrorClass | undefined;
    cors?: CorsOptions;
    cacheManager?: ICacheManager;
};
