import { Container, type Newable } from "inversify";
import type { Class } from "../../types/class";
import { ControllerSymbol, type IController } from "../../types/DevpsSymbols";
import type { Express } from "express";

export function Module<T>(
    container: Container,
    controllers: [Newable<T>],
    path: `/${string}`,
    app: Express,
) {
    controllers.forEach((c) => {
        container.bind(ControllerSymbol).to(
            c,
        );
    });
    container.getAll<IController>(ControllerSymbol).forEach((c) => {
        c.___setUp___(app, path, container);
    });
}
