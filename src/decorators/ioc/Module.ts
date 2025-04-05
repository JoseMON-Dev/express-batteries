import { Container, type Newable, type ServiceIdentifier } from "inversify";
import { ControllerSymbol, type IController } from "../../types/DevpsSymbols";
import type { Express } from "express";

type ServiceInjectable = [ServiceIdentifier, Newable<any>] | [Newable<any>];
interface ModuleProps {
    controllers: Newable<any>[];
    services: ServiceInjectable[];
    path: `/${string}`;
    app: Express;
}

export function CreateModule<T>(
    {
        controllers,
        services,
        path,
        app,
    }: ModuleProps,
) {
    const container = new Container();
    services.forEach((service) => {
        if (service.length === 1) {
            container.bind(service[0]).to(service[0]);
            return;
        }
        container.bind(service[0]).to(service[1]);
    });
    controllers.forEach((c) => {
        container.bind(ControllerSymbol).to(
            c,
        );
    });
    container.getAll<IController>(ControllerSymbol).forEach((c) => {
        c.___setUp___(app, path, container);
    });
}
