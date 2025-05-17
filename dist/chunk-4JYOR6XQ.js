import {
  SWAGGER_DOC
} from "./chunk-IK5VUQLJ.js";

// src/middlewares/swagger.ts
import { getOpenAPISpecs } from "@camflan/valibot-openapi-generator";
import {
  Router
} from "express";
import * as swaggerUi from "swagger-ui-express";
var generateSwaggerDoc = async (props) => {
  const specs = await getOpenAPISpecs(
    SWAGGER_DOC,
    props
  );
  return specs;
};
var swaggerUI = async (props) => {
  const docHandler = async (_, res, _n) => {
    const doc = await generateSwaggerDoc(props);
    res.json(doc);
  };
  const routerHtml = Router().use(
    swaggerUi.serve,
    async (...args) => {
      const doc = await generateSwaggerDoc(props);
      swaggerUi.setup(doc)(...args);
    }
  );
  return {
    html: routerHtml,
    json: docHandler
  };
};

export {
  swaggerUI
};
