import { Container } from 'inversify';
import { Express } from 'express';

declare const ControllerSymbol: unique symbol;
type IController = {
    ___setUp___: (app: Express, path: `/${string}`, container: Container) => void;
};

export { ControllerSymbol, type IController };
