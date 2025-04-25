import { Container, type Newable, type ServiceIdentifier } from "inversify";
import { ControllerSymbol, type IController } from "../../types/DevpsSymbols";
import { socketMetadata } from "../../sockets/meta/socketMetadata";
import type { ExpressBatteriesApplication } from "../../types";
import { WebSocketGateWaySymbol } from "../../sockets";
import type { ICacheManager } from "../../cache";
import { expressBatteriesConfig } from "../../meta";
import { WebSocketsServer } from "../../sockets";

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
    modules?: Module[];
}

export interface Module {
    controllers: Newable<any>[];
    services?: ServiceInjectable[];
    path: `/${string}`;
    app: ExpressBatteriesApplication;
    webSockets?: Newable<any>[];
    dependencyLoaders?: DependencyLoader[];
    container: Container;
}

export async function createModule(
    props: ModuleProps,
): Promise<Module> {
    if (props.path === "/") {
        throw new Error("The path is required only '/' path is invalid");
    }
    const container = new Container();

    if (props.modules && props.modules.length > 0) {
        for (let i = 0; i < props.modules.length; i++) {
            const module = props.modules[i];
            if (module) {
                await setupModuleInjection(module, container);
            }
        }
    }

    setupStaticInjection(container);
    await setupModuleInjection({ ...props, container }, container);

    if (props.webSockets) {
        setupWsSocketsInjection(props.webSockets, container);
    }

    setupControllersInjection(
        container,
        props.controllers,
        props.app,
        props.path,
    );
    return {
        ...props,
        container,
    };
}

const setupModuleInjection = async (
    props: Module,
    container: Container,
) => {
    const { dependencyLoaders, services } = props;
    if (dependencyLoaders) {
        await setupDependencyLoaders(dependencyLoaders, container);
    }

    if (services) {
        setupServicesInjection(container, services);
    }
};

const setupDependencyLoaders = async (
    dependencyLoaders: DependencyLoader[],
    container: Container,
) => {
    for (const loader of dependencyLoaders) {
        await loader(container);
    }
};

const setupWsSocketsInjection = (
    webSockets: Newable<any>[],
    container: Container,
) => {
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
};

const setupServicesInjection = (
    container: Container,
    services: ServiceInjectable[],
) => {
    services?.forEach((service) => {
        Array.isArray(service)
            ? container.bind(service[0]).to(service[1])
            : container.bind(service).to(service);
    });
};

const setupControllersInjection = (
    container: Container,
    controllers: Newable<any>[],
    app: ExpressBatteriesApplication,
    path: `/${string}`,
) => {
    controllers.forEach((c) => {
        container.bind(ControllerSymbol).to(
            c,
        ).inSingletonScope();
        container.bind(Symbol.for(c.name)).to(c).inSingletonScope();
    });
    container.getAll<IController>(ControllerSymbol).forEach((c) => {
        c.___setUp___(app.express, path, container);
    });
};

const setupStaticInjection = (container: Container) => {
    if (expressBatteriesConfig.getCacheManagerOrNull()) {
        container.bind<ICacheManager>(Symbol.for("ICacheManager"))
            .toConstantValue(
                expressBatteriesConfig.getCacheManager(),
            );
    }
    container.bind(WebSocketsServer).toDynamicValue(() => {
        return socketMetadata.getServer();
    });
};
