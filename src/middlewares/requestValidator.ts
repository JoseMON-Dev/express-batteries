import type { NextFunction, Request, Response } from "express";
import { expressBatteriesConfig } from "../meta/config";
import { httpCodes } from "../meta/httpCodes";
import type { RequestValidationSchema } from "../types/requestValidationSchema";
import { parse } from "../functions/parse";

export type RequestValidatorProps = {
    bodySchema?: RequestValidationSchema;
    paramsSchema?: RequestValidationSchema;
    querySchema?: RequestValidationSchema;
};

export const requestValidator =
    ({ bodySchema, paramsSchema, querySchema }: RequestValidatorProps) =>
    async (req: Request, _: Response, next: NextFunction) => {
        const BadRequestError = expressBatteriesConfig.getConfig().ErrorClass;
        if (
            BadRequestError === undefined || BadRequestError === null
        ) {
            throw new Error(
                "expressBatteriesConfig is not defined errorClass is required",
            );
        }
        const errors: string[] = [];

        if (bodySchema) {
            if (!req.body) {
                return next(
                    new BadRequestError(
                        "Missing request body",
                        ["Missing request body"],
                        httpCodes.BAD_REQUEST,
                    ),
                );
            }
            const result = parse(bodySchema, req.body);
            if (!result.success) errors.push(...result.errors);
            else req.body = result.data;
        }

        if (paramsSchema) {
            if (!req.params) {
                return next(
                    new BadRequestError(
                        "Missing request params",
                        ["Missing request params"],
                        httpCodes.BAD_REQUEST,
                    ),
                );
            }
            const result = parse(paramsSchema, req.params);
            if (!result.success) errors.push(...result.errors);
            else req.params = result.data;
        }

        if (querySchema) {
            if (!req.query) {
                return next(
                    new BadRequestError(
                        "Missing request query",
                        ["Missing request query"],
                        httpCodes.BAD_REQUEST,
                    ),
                );
            }
            const result = parse(querySchema, req.query);
            if (!result.success) errors.push(...result.errors);
            else req.query = result.data;
        }

        if (errors.length > 0) {
            return next(
                new BadRequestError(
                    errors.join(","),
                    errors,
                    httpCodes.BAD_REQUEST,
                ),
            );
        }

        next();
    };
