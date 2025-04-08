import "reflect-metadata";
import { expressBatteriesConfig } from "./meta/config";
import type { ExpressBatteriesConfig } from "./types/config";
import { type Express } from "express";
import cors from "cors";

export const expressBatteries = (
    config?: ExpressBatteriesConfig,
): Express => {
    expressBatteriesConfig.setConfig({ ...config });
    const app = expressBatteriesConfig.getExpressApp();
    app.use(cors(
        { ...config?.cors },
    ));

    return app;
};

export * from "./decorators/index";
export * from "./errors/index";
export * from "./functions/index";
export * from "./meta/index";
export * from "./middlewares/index";
export * from "./types/index";
export * from "./nameTsPlugin";
