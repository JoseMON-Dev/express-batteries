import "./chunk-ZRGORZQO.js";
import {
  swaggerUI
} from "./chunk-GN2L3DOL.js";
import {
  ExpressBatteriesTs
} from "./chunk-WXTLWWCJ.js";
import "./chunk-TXT7Z7GS.js";
import {
  Params
} from "./chunk-HIANHE3J.js";
import {
  Query
} from "./chunk-WGOHZBDS.js";
import {
  Inject
} from "./chunk-T6EIFMQ3.js";
import {
  CreateModule
} from "./chunk-QO76ONXT.js";
import {
  Controller
} from "./chunk-ED3UEYJN.js";
import {
  Middleware,
  Middlewares
} from "./chunk-HJUL5FLK.js";
import {
  ResponseType
} from "./chunk-KX7XD6UE.js";
import {
  Delete,
  Get,
  Head,
  Options,
  Patch,
  Post,
  Put,
  Trace
} from "./chunk-B6P4STBX.js";
import {
  Body
} from "./chunk-S6SLLKNG.js";
import "./chunk-SW6MGHTU.js";
import {
  addValidationMiddleware
} from "./chunk-WVVSPYFJ.js";
import {
  createValidationRequestMiddleware
} from "./chunk-6IAXSIHC.js";
import {
  bodyMetadata,
  paramsMetadata,
  queryMetadata
} from "./chunk-SRWPSQDJ.js";
import {
  controllerMetadata
} from "./chunk-EV5TGX5U.js";
import {
  routeMetadata
} from "./chunk-4M4IRHAX.js";
import {
  iocMetadata
} from "./chunk-MI3YJG7I.js";
import "./chunk-ASPK4M5R.js";
import "./chunk-NIB6S4TD.js";
import "./chunk-OOL5HAVQ.js";
import "./chunk-3XSLM47Q.js";
import {
  ALLOWED_METHODS
} from "./chunk-HDTITGC2.js";
import "./chunk-A5EQN474.js";
import "./chunk-ZHIX43HH.js";
import {
  requestValidator
} from "./chunk-NWH2KRCR.js";
import "./chunk-PWUEIIDB.js";
import "./chunk-HVMHGWNY.js";
import "./chunk-RYIMOHPT.js";
import {
  expressBatteriesConfig
} from "./chunk-O5T2PXEK.js";
import {
  DECORATORS_METADATA_KEYS
} from "./chunk-L5HOEFIA.js";
import {
  SWAGGER_DOC
} from "./chunk-IK5VUQLJ.js";
import {
  descriptionHttpCode,
  httpCodes
} from "./chunk-2WIR5VWA.js";
import "./chunk-ZFRYLPIO.js";
import {
  ApiError
} from "./chunk-YIHLBXI6.js";
import "./chunk-LY3JFBQG.js";
import {
  setUpControllers
} from "./chunk-XRIKVWE5.js";
import {
  isValibotSchema
} from "./chunk-O3QR3TO7.js";
import {
  parse
} from "./chunk-7K7W34ZL.js";
import {
  ControllerSymbol
} from "./chunk-TBVPSSES.js";
import {
  describeSetting
} from "./chunk-SSYN7GUO.js";

// src/index.ts
import "reflect-metadata";
import "express";
import express from "express";
var expressBatteries = (config) => {
  const app = express();
  expressBatteriesConfig.setConfig(config);
  return app;
};
export {
  ALLOWED_METHODS,
  ApiError,
  Body,
  Controller,
  ControllerSymbol,
  CreateModule,
  DECORATORS_METADATA_KEYS,
  Delete,
  ExpressBatteriesTs,
  Get,
  Head,
  Inject,
  Middleware,
  Middlewares,
  Options,
  Params,
  Patch,
  Post,
  Put,
  Query,
  ResponseType,
  SWAGGER_DOC,
  Trace,
  addValidationMiddleware,
  bodyMetadata,
  controllerMetadata,
  createValidationRequestMiddleware,
  describeSetting,
  descriptionHttpCode,
  expressBatteries,
  expressBatteriesConfig,
  httpCodes,
  iocMetadata,
  isValibotSchema,
  paramsMetadata,
  parse,
  queryMetadata,
  requestValidator,
  routeMetadata,
  setUpControllers,
  swaggerUI
};
