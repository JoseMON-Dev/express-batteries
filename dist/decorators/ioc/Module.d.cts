import { Container, ServiceIdentifier, Newable } from 'inversify';
import { ExpressBatteriesApplication } from '../../types/ExpressBatteriesApplication.cjs';
import 'express';
import 'http';
import 'socket.io';

type DependencyLoader = (container: Container) => void | Promise<void>;
type ServiceInjectable = [ServiceIdentifier, Newable<any>] | Newable<any>;
interface ModuleProps {
    controllers: Newable<any>[];
    services?: ServiceInjectable[];
    path: `/${string}`;
    app: ExpressBatteriesApplication;
    webSockets?: Newable<any>[];
    dependencyLoaders?: DependencyLoader[];
    modules?: Module[];
}
interface Module {
    controllers: Newable<any>[];
    services?: ServiceInjectable[];
    path: `/${string}`;
    app: ExpressBatteriesApplication;
    webSockets?: Newable<any>[];
    dependencyLoaders?: DependencyLoader[];
    container: Container;
}
declare function createModule(props: ModuleProps): Promise<Module>;

export { type DependencyLoader, type Module, type ModuleProps, type ServiceInjectable, createModule };
