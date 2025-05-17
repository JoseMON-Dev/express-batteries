import {
  WebSocketGateWaySymbol
} from "./chunk-BYW3QBKY.js";
import {
  WebSocketsServer
} from "./chunk-J6LY5Z4C.js";
import {
  socketMetadata
} from "./chunk-G7YV7R2W.js";
import {
  expressBatteriesConfig
} from "./chunk-UVSNYCVZ.js";
import {
  ControllerSymbol
} from "./chunk-TBVPSSES.js";

// src/decorators/ioc/Module.ts
import { Container } from "inversify";
async function createModule(props) {
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
    props.path
  );
  return {
    ...props,
    container
  };
}
var setupModuleInjection = async (props, container) => {
  const { dependencyLoaders, services } = props;
  if (dependencyLoaders) {
    await setupDependencyLoaders(dependencyLoaders, container);
  }
  if (services) {
    setupServicesInjection(container, services);
  }
};
var setupDependencyLoaders = async (dependencyLoaders, container) => {
  for (const loader of dependencyLoaders) {
    await loader(container);
  }
};
var setupWsSocketsInjection = (webSockets, container) => {
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
var setupServicesInjection = (container, services) => {
  services?.forEach((service) => {
    Array.isArray(service) ? container.bind(service[0]).to(service[1]) : container.bind(service).to(service);
  });
};
var setupControllersInjection = (container, controllers, app, path) => {
  controllers.forEach((c) => {
    container.bind(ControllerSymbol).to(
      c
    ).inSingletonScope();
    container.bind(Symbol.for(c.name)).to(c).inSingletonScope();
  });
  container.getAll(ControllerSymbol).forEach((c) => {
    c.___setUp___(app.express, path, container);
  });
};
var setupStaticInjection = (container) => {
  if (expressBatteriesConfig.getCacheManagerOrNull()) {
    container.bind(Symbol.for("ICacheManager")).toConstantValue(
      expressBatteriesConfig.getCacheManager()
    );
  }
  container.bind(WebSocketsServer).toDynamicValue(() => {
    return socketMetadata.getServer();
  });
};

export {
  createModule
};
