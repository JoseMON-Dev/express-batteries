import type { Container } from "inversify";
import type { Express } from "express";

export const ControllerSymbol = Symbol.for("Controller");
export type IController = {
    ___setUp___: (
        app: Express,
        path: `/${string}`,
        container: Container,
    ) => void;
};
