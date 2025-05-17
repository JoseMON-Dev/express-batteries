type KeyGenerator = (methodName: string, args: any[]) => string | string[];
declare function invalidateCache(keyOrPattern: string | KeyGenerator): MethodDecorator;

export { invalidateCache };
