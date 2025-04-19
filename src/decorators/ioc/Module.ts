import { Container, type Newable, type ServiceIdentifier } from "inversify";
import { ControllerSymbol, type IController } from "../../types/DevpsSymbols";
import { socketMetadata } from "../../sockets/meta/socketMetadata";
import type { ExpressBatteriesApplication } from "../../types";
import { WebSocketGateWaySymbol } from "../../sockets";

export type DependencyLoader = (container: Container) => void | Promise<void>;
export type ServiceInjectable =
    | [ServiceIdentifier, Newable<any>]
    | Newable<any>;
export interface ModuleProps {
    controllers: Newable<any>[];
    services?: ServiceInjectable[];
    path: `/${string}`;
    app: ExpressBatteriesApplication;
    webSockets?: Newable<any>[];
    dependencyLoaders?: DependencyLoader[];
}

export async function createModule(
    {
        controllers,
        services,
        path,
        app,
        dependencyLoaders,
        webSockets,
    }: ModuleProps,
) {
    if (path === "/") {
        throw new Error("The path is required only '/' path is invalid");
    }
    const container = new Container();

    if (dependencyLoaders) {
        for (const loader of dependencyLoaders) {
            await loader(container);
        }
    }

    services?.forEach((service) => {
        Array.isArray(service)
            ? container.bind(service[0]).to(service[1])
            : container.bind(service).to(service);
    });

    webSockets?.forEach((ws) => {
        if (socketMetadata.isGateWay(ws)) {
            container.bind(Symbol.for(ws.name)).to(ws).inSingletonScope();
            container.bind(WebSocketGateWaySymbol).to(ws).inSingletonScope();
            socketMetadata.setIOCContainer(ws, container);
            socketMetadata.addGateWay(ws);
        } else {
            throw new Error(`${ws} is not a webSocket gateway`);
        }
    });

    controllers.forEach((c) => {
        container.bind(ControllerSymbol).to(
            c,
        ).inSingletonScope();
        container.bind(Symbol.for(c.name)).to(c).inSingletonScope();
    });
    container.getAll<IController>(ControllerSymbol).forEach((c) => {
        c.___setUp___(app.express, path, container);
    });
}
