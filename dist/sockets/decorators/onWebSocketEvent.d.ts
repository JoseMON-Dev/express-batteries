declare function OnWsEvent(event: Exclude<string, "connection" | "disconnect">): MethodDecorator;

export { OnWsEvent };
