import {
  SWAGGER_DOC
} from "./chunk-IK5VUQLJ.js";

// src/middlewares/swagger.ts
import { getOpenAPISpecs } from "@camflan/valibot-openapi-generator";
import "express";
import * as swaggerUi from "swagger-ui-express";
var generateSwaggerDoc = async (props) => {
  const specs = await getOpenAPISpecs(
    SWAGGER_DOC,
    props
  );
  return specs;
};
var swaggerUI = async (props) => {
  const doc = await generateSwaggerDoc(props);
  const docHandler = (_, res, _n) => {
    res.json(doc);
  };
  return [swaggerUi.setup(doc), docHandler];
};

export {
  swaggerUI
};
