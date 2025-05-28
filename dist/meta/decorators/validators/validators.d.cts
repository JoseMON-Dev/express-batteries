import { ValidatorDecoratorProps } from '../../../types/decorator.cjs';
import { ObjectEntries } from 'valibot';
import { RequestValidationSchema } from '../../../types/requestValidationSchema.cjs';

declare const bodyMetadata: {
    key: "router:body";
    addRouteBody: <T extends ObjectEntries>(value: ValidatorDecoratorProps<T>["schema"], target: object, propertyKey: string | symbol) => void;
    getRouteBody: (target: object, propertyKey: string | symbol) => RequestValidationSchema | undefined;
};
declare const queryMetadata: {
    key: "router:queries";
    addRouteQuery: <T extends ObjectEntries>(value: ValidatorDecoratorProps<T>["schema"], target: object, propertyKey: string | symbol) => void;
    getRouteQuery: (target: object, propertyKey: string | symbol) => RequestValidationSchema | undefined;
};
declare const paramsMetadata: {
    key: "router:params";
    addRouteParams: <T extends ObjectEntries>(value: ValidatorDecoratorProps<T>["schema"], target: object, propertyKey: string | symbol) => void;
    getRouteParams: (target: object, propertyKey: string | symbol) => RequestValidationSchema | undefined;
};

export { bodyMetadata, paramsMetadata, queryMetadata };
