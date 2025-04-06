import { Container, type Newable, type ServiceIdentifier } from "inversify";
import { ControllerSymbol, type IController } from "../../types/DevpsSymbols";
import type { Express } from "express";

export type DependencyLoader = (container: Container) => void;
export type ServiceInjectable =
    | [ServiceIdentifier, Newable<any>]
    | Newable<any>;
export interface ModuleProps {
    controllers: Newable<any>[];
    services?: ServiceInjectable[];
    path: `/${string}`;
    app: Express;
    dependencyLoaders?: DependencyLoader[];
}

export function CreateModule<T>(
    {
        controllers,
        services,
        path,
        app,
        dependencyLoaders,
    }: ModuleProps,
) {
    const container = new Container();
    dependencyLoaders?.forEach((fn) => {
        fn(container);
    });
    services?.forEach((service) => {
        Array.isArray(service)
            ? container.bind(service[0]).to(service[1])
            : container.bind(service).to(service);
    });

    controllers.forEach((c) => {
        container.bind(ControllerSymbol).to(
            c,
        ).inSingletonScope();
    });
    container.getAll<IController>(ControllerSymbol).forEach((c) => {
        c.___setUp___(app, path, container);
    });
}
