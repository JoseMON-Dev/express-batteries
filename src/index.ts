import "reflect-metadata";
import { expressBatteriesConfig } from "./meta/config";
import type { ExpressBatteriesConfig } from "./types/config";
import cors from "cors";
import type {
    ExpressBatteriesApplication,
} from "./types/ExpressBatteriesApplication";
import { startWebSockets } from "./sockets/index";

export const expressBatteries = async (
    config?: ExpressBatteriesConfig,
): Promise<ExpressBatteriesApplication> => {
    expressBatteriesConfig.setConfig({ ...config });

    const app = expressBatteriesConfig.getExpressApp();
    app.use(cors(
        { ...config?.cors },
    ));
    const listen = async (port: number) => {
        if (config && config.wsAdapterGenerator) {
            await startWebSockets(config.wsAdapterGenerator);
        } else {
            await startWebSockets();
        }
        return expressBatteriesConfig.getHttpServer().listen(
            port,
            () => {
                if (process.env.NODE_ENV !== "production") {
                    console.log(
                        `🚀 Server ready at http://localhost:${port}`,
                    );
                    return;
                }
                console.log("server ready");
            },
        );
    };

    return {
        express: app,
        wsServer: expressBatteriesConfig.getSocketServer(),
        listen,
    };
};

export * from "./decorators/index";
export * from "./errors/index";
export * from "./functions/index";
export * from "./meta/index";
export * from "./middlewares/index";
export * from "./types/index";
export * from "./nameTsPlugin";
export * from "./sockets/index";
export * from "./cache/index";
