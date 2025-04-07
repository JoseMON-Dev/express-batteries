import { OptionsJson } from 'body-parser';

type OptionalElement = any | undefined;
type RestParams = any[] | undefined[] | OptionalElement;
type ErrorClass = new (message: string, errors: string[], code: number, ...rest: RestParams) => Error & {
    toJson(): object;
};
type ExpressBatteriesConfig = {
    ErrorClass?: ErrorClass | undefined;
    OptionsJson?: OptionsJson;
};

export type { ErrorClass, ExpressBatteriesConfig, OptionalElement, RestParams };
