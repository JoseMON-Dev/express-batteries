import { Dependency } from '../../types/ioc.cjs';
import 'inversify';

declare const iocMetadata: {
    getAllDependencies: <T>(target: object, propertyKey: string | symbol) => Dependency<T>[];
    addDependency: <T>(target: object, propertyKey: string | symbol, dependency: Dependency<T>) => void;
};

export { iocMetadata };
