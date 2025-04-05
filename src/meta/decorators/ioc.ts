import type { Dependency } from "../../types/ioc";
import { DECORATORS_METADATA_KEYS } from "../decorators.metadata";

export const iocMetadata = {
    getAllDependencies: <T>(
        target: object,
        propertyKey: string | symbol,
    ): Dependency<T>[] => {
        return (
            Reflect.getMetadata(
                DECORATORS_METADATA_KEYS.IOC_CONTAINER_KEYS,
                target,
                propertyKey,
            ) || []
        );
    },

    addDependency: <T>(
        target: object,
        propertyKey: string | symbol,
        dependency: Dependency<T>,
    ) => {
        const allDependencies = iocMetadata.getAllDependencies<T>(
            target,
            propertyKey,
        );
        allDependencies.push(dependency);
        Reflect.defineMetadata(
            DECORATORS_METADATA_KEYS.IOC_CONTAINER_KEYS,
            [...allDependencies],
            target,
            propertyKey,
        );
    },
};
