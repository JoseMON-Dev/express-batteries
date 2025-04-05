import { ApiError } from "../errors/baseError";
import type { ExpressBatteriesConfig } from "../types/config";

const baseConfig = {
    ErrorClass: ApiError,
};

let globalConfig: ExpressBatteriesConfig = { ...baseConfig };

export const expressBatteriesConfig: {
    setConfig: (config: ExpressBatteriesConfig | undefined) => void;
    getConfig: () => ExpressBatteriesConfig;
} = {
    setConfig: (config: ExpressBatteriesConfig | undefined) => {
        if (config) {
            globalConfig = config;
        }
    },
    getConfig: () => globalConfig,
};
