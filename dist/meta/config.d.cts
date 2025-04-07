import { ExpressBatteriesConfig } from '../types/config.cjs';
import 'body-parser';

type GlobalConfig = Omit<ExpressBatteriesConfig, "ErrorClass"> & Required<Pick<ExpressBatteriesConfig, "ErrorClass">>;
declare const expressBatteriesConfig: {
    setConfig: (config: ExpressBatteriesConfig | undefined) => void;
    getConfig: () => GlobalConfig;
    getErrorSchema: () => object;
};

export { type GlobalConfig, expressBatteriesConfig };
