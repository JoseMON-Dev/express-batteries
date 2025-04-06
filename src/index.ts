import "reflect-metadata";
import { expressBatteriesConfig } from "./meta/config";
import type { ExpressBatteriesConfig } from "./types/config";
import { type Express } from "express";
import express from "express";

export const expressBatteries = (
    config?: ExpressBatteriesConfig,
): Express => {
    const app = express();
    expressBatteriesConfig.setConfig(config);
    app.use(express.json(config?.OptionsJson));
    return app;
};

export * from "./decorators/index";
export * from "./errors/index";
export * from "./functions/index";
export * from "./meta/index";
export * from "./middlewares/index";
export * from "./types/index";
export * from "./nameTsPlugin";
