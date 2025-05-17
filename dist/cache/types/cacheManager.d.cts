import { SetTTL, SetGuards, SetCommonOptions } from './cache.config.cjs';

interface ICacheManager {
    get<T>(key: string): Promise<T | undefined | null>;
    set<T>(key: string, value: T, options?: SetTTL & SetGuards & SetCommonOptions): Promise<boolean>;
    keys(pattern: string): Promise<string[]>;
    delete(key: string): Promise<boolean>;
    exists(key: string): Promise<boolean>;
}

export type { ICacheManager };
