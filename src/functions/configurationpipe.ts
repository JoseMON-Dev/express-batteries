import type { ExpressBatteriesApplication } from "../types/ExpressBatteriesApplication"

export type ExpressBatteriesPipeFn = (app: ExpressBatteriesApplication) => ExpressBatteriesApplication | Promise<ExpressBatteriesApplication>;
const expressBatteriesApplicationPipe = async (initialApp: Promise<ExpressBatteriesApplication> | (() => Promise<ExpressBatteriesApplication>), ...pipes: ExpressBatteriesPipeFn[]) => {
    let app = await (typeof initialApp === "function" ? initialApp() : initialApp);
    for (const pipe of pipes) {
        app = await pipe(app);
    }
    return app;
}
export { expressBatteriesApplicationPipe };