import { DECORATORS_METADATA_KEYS } from "../../decorators.metadata";
import { createValidationRequestMiddleware } from "../route/functions";
import { routeMetadata } from "../route/route";

export function addValidationMiddleware(
    target: object,
    propertyKey: string | symbol,
) {
    routeMetadata.addRouteMiddleware(
        target,
        propertyKey,
        createValidationRequestMiddleware(target, propertyKey),
    );
}
