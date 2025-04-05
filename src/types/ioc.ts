import type { ServiceIdentifier, OptionalGetOptions } from "inversify"

export type Dependency<T> = {
    dependencySymbol: ServiceIdentifier<T>
    options?: OptionalGetOptions
    index: number
}