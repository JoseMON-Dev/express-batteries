import { Plugin } from "vite";
import ts from "typescript";
import transformer from "./plugin";

export default function expressBatteriesTsPlugin(): Plugin {
    return {
        name: "vite:custom-ts-transformer",
        enforce: "pre",
        async transform(code, id) {
            if (!id.endsWith(".ts") && !id.endsWith(".tsx")) {
                return null;
            }

            const result = ts.transpileModule(code, {
                compilerOptions: {
                    module: ts.ModuleKind.ESNext,
                    target: ts.ScriptTarget.ESNext,
                },
                transformers: {
                    before: [transformer(ts.createProgram([], {}))],
                },
                reportDiagnostics: true,
            });

            return {
                code: result.outputText,
                map: result.sourceMapText
                    ? JSON.parse(result.sourceMapText)
                    : null,
            };
        },
    };
}
