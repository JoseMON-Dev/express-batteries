import {
  ControllerSymbol
} from "./chunk-TBVPSSES.js";

// src/decorators/ioc/Module.ts
import { Container } from "inversify";
function CreateModule({
  controllers,
  services,
  path,
  app,
  dependencyLoaders
}) {
  const container = new Container();
  dependencyLoaders?.forEach((fn) => {
    fn(container);
  });
  services?.forEach((service) => {
    Array.isArray(service) ? container.bind(service[0]).to(service[1]) : container.bind(service).to(service);
  });
  controllers.forEach((c) => {
    container.bind(ControllerSymbol).to(
      c
    ).inSingletonScope();
  });
  container.getAll(ControllerSymbol).forEach((c) => {
    c.___setUp___(app, path, container);
  });
}

export {
  CreateModule
};
