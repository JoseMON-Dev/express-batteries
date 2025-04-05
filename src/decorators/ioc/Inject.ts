import type { OptionalGetOptions, ServiceIdentifier } from "inversify";
import { iocMetadata } from "../../meta/decorators/ioc";

export const Inject = <T>(
    dependencySymbol: ServiceIdentifier<T>,
    options?: OptionalGetOptions,
): ParameterDecorator => {
    return (target, propertyKey, parameterIndex) => {
        if (propertyKey && parameterIndex) {
            iocMetadata.addDependency(target, propertyKey, {
                dependencySymbol: dependencySymbol,
                options,
                index: parameterIndex,
            });
        }
    };
};
