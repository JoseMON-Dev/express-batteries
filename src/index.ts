import "reflect-metadata";
import { expressBatteriesConfig } from "./meta/config";
import type { ExpressBatteriesConfig } from "./types/config";
import { type Express } from "express";
import express from "express";

export const expressBatteries = (
    config?: ExpressBatteriesConfig,
): Express => {
    expressBatteriesConfig.setConfig(config);
    return express();
};
