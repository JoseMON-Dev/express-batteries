import type { SetCommonOptions, SetGuards, SetTTL } from "./cache.config";

export interface ICacheManager {
    get<T>(key: string): Promise<T | undefined | null>;
    set<T>(
        key: string,
        value: T,
        options?: SetTTL & SetGuards & SetCommonOptions,
    ): Promise<boolean>;
    keys(pattern: string): Promise<string[]>;
    delete(key: string | string[]): Promise<boolean>;
    exists(key: string): Promise<boolean>;
}
