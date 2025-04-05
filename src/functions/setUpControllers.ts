import { type Express } from "express";
import { Container } from "inversify";
import { ControllerSymbol, type IController } from "../types/DevpsSymbols";

export const setUpControllers = (
    app: Express,
    container: Container,
    path: `/${string}`,
) => {
    const controllers = container.getAll<IController>(
        ControllerSymbol,
    );
    console.log(controllers);
    controllers.forEach((controller) => {
        if (!controller.___setUp___) {
            throw new Error(
                "Controller must have @Controller decorator, controller: " +
                    controller.constructor.name,
            );
        }
        controller.___setUp___(app, path, container);
    });
    return app;
};
