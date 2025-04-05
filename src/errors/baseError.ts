export class ApiError extends Error {
    constructor(message: string, public errors: string[], public code: number) {
        super(message);
    }

    toJson(): object {
        return {
            errors: this.errors,
        };
    }
}
