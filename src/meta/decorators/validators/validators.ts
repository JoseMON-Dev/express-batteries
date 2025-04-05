import type { ValidatorDecoratorProps } from "../../../types/decorator";
import type { ObjectEntries } from "valibot";
import { DECORATORS_METADATA_KEYS } from "../../decorators.metadata";
import { get } from "http";
import type { RequestValidationSchema } from "../../../types/requestValidationSchema";

export const bodyMetadata = {
    key: DECORATORS_METADATA_KEYS.BODY,
    addRouteBody: <T extends ObjectEntries>(
        value: ValidatorDecoratorProps<T>["schema"],
        target: object,
        propertyKey: string | symbol,
    ) => {
        if (Reflect.getMetadata(paramsMetadata.key, target, propertyKey)) {
            throw new Error(
                `Metadata ${paramsMetadata.key} already exists on ${target}#${
                    typeof propertyKey === "symbol"
                        ? propertyKey.description
                        : propertyKey
                }. Body can only be defined once`,
            );
        }
        Reflect.defineMetadata(bodyMetadata.key, value, target, propertyKey);
    },

    getRouteBody: (
        target: object,
        propertyKey: string | symbol,
    ) => {
        const metadata = Reflect.getMetadata(
            bodyMetadata.key,
            target,
            propertyKey,
        );

        return metadata as RequestValidationSchema | undefined;
    },
};

export const queryMetadata = {
    key: DECORATORS_METADATA_KEYS.QUERIES,
    addRouteQuery: <T extends ObjectEntries>(
        value: ValidatorDecoratorProps<T>["schema"],
        target: object,
        propertyKey: string | symbol,
    ) => {
        if (Reflect.getMetadata(queryMetadata.key, target, propertyKey)) {
            throw new Error(
                `Metadata ${queryMetadata.key} already exists on ${target}#${
                    typeof propertyKey === "symbol"
                        ? propertyKey.description
                        : propertyKey
                }. Params can only be defined once`,
            );
        }
        Reflect.defineMetadata(queryMetadata.key, value, target, propertyKey);
    },

    getRouteQuery: (
        target: object,
        propertyKey: string | symbol,
    ) => {
        const metadata = Reflect.getMetadata(
            queryMetadata.key,
            target,
            propertyKey,
        );
        return metadata as RequestValidationSchema | undefined;
    },
};

export const paramsMetadata = {
    key: DECORATORS_METADATA_KEYS.PARAMS,

    addRouteParams: <T extends ObjectEntries>(
        value: ValidatorDecoratorProps<T>["schema"],
        target: object,
        propertyKey: string | symbol,
    ) => {
        if (Reflect.getMetadata(paramsMetadata.key, target, propertyKey)) {
            throw new Error(
                `Metadata ${paramsMetadata.key} already exists on ${target}#${
                    typeof propertyKey === "symbol"
                        ? propertyKey.description
                        : propertyKey
                }. Params can only be defined once`,
            );
        }
        Reflect.defineMetadata(paramsMetadata.key, value, target, propertyKey);
    },

    getRouteParams: (
        target: object,
        propertyKey: string | symbol,
    ) => {
        const metadata = Reflect.getMetadata(
            paramsMetadata.key,
            target,
            propertyKey,
        );
        return metadata as RequestValidationSchema | undefined;
    },
};
