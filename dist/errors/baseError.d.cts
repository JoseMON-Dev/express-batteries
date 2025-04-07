declare class ApiError extends Error {
    errors: string[];
    code: number;
    constructor(message: string, errors: string[], code: number);
    toJson(): object;
}

export { ApiError };
