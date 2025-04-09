import type { Container } from "inversify";
import type { Application } from "express";

export const ControllerSymbol = Symbol.for("Controller");
export type IController = {
    ___setUp___: (
        app: Application,
        path: `/${string}`,
        container: Container,
    ) => void;
};
