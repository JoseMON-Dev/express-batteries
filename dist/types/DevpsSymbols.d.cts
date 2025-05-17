import { Container } from 'inversify';
import { Application } from 'express';

declare const ControllerSymbol: unique symbol;
type IController = {
    ___setUp___: (app: Application, path: `/${string}`, container: Container) => void;
};

export { ControllerSymbol, type IController };
