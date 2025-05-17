import { Express } from 'express';
import { Container } from 'inversify';

declare const setUpControllers: (app: Express, container: Container, path: `/${string}`) => Express;

export { setUpControllers };
