import type { RequestHandler } from "express";
import { requestValidator } from "../../../middlewares/requestValidator";
import {
    bodyMetadata,
    paramsMetadata,
    queryMetadata,
} from "../validators/validators";

export function createValidationRequestMiddleware(
    target: object,
    propertyKey: string | symbol,
): RequestHandler {
    const bodySchema = bodyMetadata.getRouteBody(target, propertyKey);
    const paramsSchema = paramsMetadata.getRouteParams(target, propertyKey);
    const querySchema = queryMetadata.getRouteQuery(target, propertyKey);

    const handler = requestValidator({
        bodySchema,
        paramsSchema,
        querySchema,
    });
    return handler;
}
