namespace ExpressBatteriesTs {
    export function name<T>(): string {
        throw new Error("This function should be transformed by the TypeScript plugin.");
    }
}

namespace Ts {
    export function name<T>(): string {
        throw new Error("This function should be transformed by the TypeScript plugin.");
    }
}

export { ExpressBatteriesTs, Ts };
