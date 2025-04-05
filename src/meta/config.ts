import toJsonSchema from "to-json-schema";
import { ApiError } from "../errors/baseError";
import type { ExpressBatteriesConfig } from "../types/config";

const baseConfig = {
    ErrorClass: ApiError,
};

export type GlobalConfig =
    & Omit<ExpressBatteriesConfig, "ErrorClass">
    & Required<Pick<ExpressBatteriesConfig, "ErrorClass">>;

let globalConfig:
    & Omit<ExpressBatteriesConfig, "ErrorClass">
    & Required<Pick<ExpressBatteriesConfig, "ErrorClass">> = { ...baseConfig };

export const expressBatteriesConfig: {
    setConfig: (config: ExpressBatteriesConfig | undefined) => void;
    getConfig: () => GlobalConfig;
    getErrorSchema: () => object;
} = {
    setConfig: (config: ExpressBatteriesConfig | undefined) => {
        if (config) {
            globalConfig = { ...globalConfig, ...config };
        }
    },
    getConfig: () => globalConfig,
    getErrorSchema: () => {
        const Error = expressBatteriesConfig.getConfig().ErrorClass;
        const instance = new Error("error", ["erer", "sdsd"], 200);
        return toJsonSchema(
            instance.toJson(),
        );
    },
};
