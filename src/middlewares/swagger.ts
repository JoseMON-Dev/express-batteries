import { getOpenAPISpecs } from "@camflan/valibot-openapi-generator";
import {
    type NextFunction,
    type Request,
    type RequestHandler,
    type Response,
    Router,
} from "express";
import type { OpenAPIV3 } from "openapi-types";
import { SWAGGER_DOC } from "../meta";
import type { AllowedMethod } from "../types";
import * as swaggerUi from "swagger-ui-express";

type OpenApiSpecsOptions = {
    documentation?: Omit<
        Partial<OpenAPIV3.Document>,
        | "x-express-openapi-additional-middleware"
        | "x-express-openapi-validation-strict"
    >;
    exclude?: Array<RegExp | string> | RegExp | string;
    excludeMethods?: AllowedMethod[];
    excludeStaticFile?: boolean;
    excludeTags?: string[];
};

const generateSwaggerDoc = async (props: OpenApiSpecsOptions) => {
    const specs = await getOpenAPISpecs(
        SWAGGER_DOC,
        props,
    );
    return specs;
};

export const swaggerUI = async (
    props: OpenApiSpecsOptions,
): Promise<{
    html: RequestHandler;
    json: RequestHandler;
}> => {
    const docHandler: RequestHandler = async (
        _: Request,
        res: Response,
        _n: NextFunction,
    ) => {
        const doc = await generateSwaggerDoc(props);
        res.json(doc);
    };
    const routerHtml = Router().use(
        swaggerUi.serve,
        async (...args: [Request, Response, NextFunction]) => {
            const doc = await generateSwaggerDoc(props);
            swaggerUi.setup(doc)(...args);
        },
    );
    return {
        html: routerHtml,
        json: docHandler,
    };
};
