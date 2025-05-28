import { ServiceIdentifier, OptionalGetOptions } from 'inversify';

type Dependency<T> = {
    dependencySymbol: ServiceIdentifier<T>;
    options?: OptionalGetOptions;
    index: number;
};

export type { Dependency };
