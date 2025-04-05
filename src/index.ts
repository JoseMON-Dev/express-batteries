import { expressBatteriesConfig } from "./meta/config";
import type { ExpressBatteriesConfig } from "./types/config";
import { type Express } from "express";
import app from "express";
export * from "./decorators/ioc/Inject";
export * from "./decorators/ioc/Module";
export * from "./decorators/routes/Controller";
export * from "./decorators/routes/Route";
export * from "./decorators/routes/Response";
export * from "./decorators/routes/Middleware";
export * from "./decorators/routes/validators/Body";
export * from "./decorators/routes/validators/Query";
export * from "./decorators/routes/validators/Params";
export * from "./errors/baseError";
export * from "./functions/index";
export * from "./types/index";
export * from "./middlewares/index";
export * from "./meta/index";

export const expressBatteries = (
    config?: ExpressBatteriesConfig,
) => {
    expressBatteriesConfig.setConfig(config);
};
