import { DECORATORS_METADATA_KEYS } from "../../decorators.metadata";
import { createValidationRequestMiddleware } from "../route/functions";
import { routeMetadata } from "../route/route";

export function addValidationMiddleware(
    target: object,
    propertyKey: string | symbol,
) {
    const haveValidation = Reflect.getMetadata(
        DECORATORS_METADATA_KEYS.HAVE_VALIDATION,
        target,
        propertyKey,
    );

    if (!haveValidation) {
        Reflect.defineMetadata(
            DECORATORS_METADATA_KEYS.HAVE_VALIDATION,
            true,
            target,
            propertyKey,
        );
        routeMetadata.addRouteMiddleware(
            target,
            propertyKey,
            createValidationRequestMiddleware(target, propertyKey),
        );
    }
}
