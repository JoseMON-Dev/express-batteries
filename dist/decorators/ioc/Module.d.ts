import { Container, ServiceIdentifier, Newable } from 'inversify';
import { Express } from 'express';

type DependencyLoader = (container: Container) => void;
type ServiceInjectable = [ServiceIdentifier, Newable<any>] | Newable<any>;
interface ModuleProps {
    controllers: Newable<any>[];
    services?: ServiceInjectable[];
    path: `/${string}`;
    app: Express;
    dependencyLoaders?: DependencyLoader[];
}
declare function CreateModule<T>({ controllers, services, path, app, dependencyLoaders, }: ModuleProps): void;

export { CreateModule, type DependencyLoader, type ModuleProps, type ServiceInjectable };
