export function describeSetting(setting: number | symbol | string): string {
    if (typeof setting === "string") {
        return setting;
    }
    if (typeof setting === "number") {
        return `${setting}`;
    }

    return `${String(setting.description ?? setting.toString())}`;
}
