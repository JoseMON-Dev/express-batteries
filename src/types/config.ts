export type OptionalElement = any | undefined;
export type RestParams = any[] | undefined[] | OptionalElement;
export type ErrorClass = new (
    message: string,
    errors: string[],
    code: number,
    ...rest: RestParams
) => Error;

export type ExpressBatteriesConfig = {
    ErrorClass: ErrorClass | undefined;
};
