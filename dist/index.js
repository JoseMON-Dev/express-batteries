import "./chunk-ZRGORZQO.js";
import {
  swaggerUI
} from "./chunk-4JYOR6XQ.js";
import {
  ExpressBatteriesTs
} from "./chunk-WXTLWWCJ.js";
import "./chunk-3L3IZ6CW.js";
import "./chunk-TD6XDCJL.js";
import "./chunk-HTTP7IGP.js";
import "./chunk-JUOV7IAS.js";
import {
  cached
} from "./chunk-6EZX5KOI.js";
import {
  invalidateCache
} from "./chunk-B76M5FQM.js";
import {
  cacheMetadata
} from "./chunk-6TSO7Q7V.js";
import "./chunk-TXT7Z7GS.js";
import {
  Query
} from "./chunk-HJRE6NSV.js";
import {
  Body
} from "./chunk-ZFH56OEY.js";
import {
  Params
} from "./chunk-AK62KRSL.js";
import {
  Delete,
  Get,
  Head,
  Options,
  Patch,
  Post,
  Put,
  Trace
} from "./chunk-KTHTQWIM.js";
import {
  Inject
} from "./chunk-T6EIFMQ3.js";
import {
  createModule
} from "./chunk-FLBLUSQP.js";
import {
  Controller
} from "./chunk-J276KJ4L.js";
import {
  Middleware,
  Middlewares
} from "./chunk-7EG24DYV.js";
import {
  ResponseType
} from "./chunk-KX7XD6UE.js";
import {
  WebSocketGateWaySymbol,
  startWebSockets
} from "./chunk-UIGCTVA4.js";
import {
  WebSocketsServer
} from "./chunk-J6LY5Z4C.js";
import "./chunk-NBSTUOJF.js";
import "./chunk-KJVJ2PGG.js";
import "./chunk-EXPL37CT.js";
import "./chunk-Y5AKBUNJ.js";
import {
  WsServer
} from "./chunk-NXIEHZPE.js";
import {
  OnWsEvent
} from "./chunk-2JD6GX5H.js";
import {
  WsBody
} from "./chunk-S5ZYE47I.js";
import {
  WsGateway
} from "./chunk-KI63W7LD.js";
import {
  WsMiddlewares
} from "./chunk-IQJ33ORB.js";
import {
  WsSocket
} from "./chunk-AETACFBY.js";
import {
  socketMetadata
} from "./chunk-VQ5JRWOW.js";
import "./chunk-SW6MGHTU.js";
import {
  addValidationMiddleware
} from "./chunk-SAAJ2WJQ.js";
import {
  createValidationRequestMiddleware
} from "./chunk-HOAK4ZF2.js";
import {
  bodyMetadata,
  paramsMetadata,
  queryMetadata
} from "./chunk-SRWPSQDJ.js";
import {
  iocMetadata
} from "./chunk-MI3YJG7I.js";
import {
  controllerMetadata
} from "./chunk-RORZUQNO.js";
import {
  routeMetadata
} from "./chunk-4M4IRHAX.js";
import "./chunk-WCQXIIQB.js";
import {
  ALLOWED_METHODS
} from "./chunk-HDTITGC2.js";
import "./chunk-A5EQN474.js";
import "./chunk-ZHIX43HH.js";
import "./chunk-PWUEIIDB.js";
import "./chunk-HVMHGWNY.js";
import "./chunk-RYIMOHPT.js";
import "./chunk-NIB6S4TD.js";
import "./chunk-OOL5HAVQ.js";
import "./chunk-3XSLM47Q.js";
import {
  SWAGGER_DOC
} from "./chunk-IK5VUQLJ.js";
import {
  requestValidator
} from "./chunk-PSSXQENC.js";
import {
  descriptionHttpCode,
  httpCodes
} from "./chunk-2WIR5VWA.js";
import "./chunk-C2OFKVFO.js";
import "./chunk-AWTI3FX3.js";
import {
  describeSetting
} from "./chunk-SSYN7GUO.js";
import {
  insertAtIndex
} from "./chunk-TBII24RB.js";
import {
  isValibotSchema
} from "./chunk-O3QR3TO7.js";
import {
  parse
} from "./chunk-7K7W34ZL.js";
import {
  setUpControllers
} from "./chunk-XRIKVWE5.js";
import {
  ControllerSymbol
} from "./chunk-TBVPSSES.js";
import {
  DECORATORS_METADATA_KEYS
} from "./chunk-L5HOEFIA.js";
import {
  expressBatteriesConfig
} from "./chunk-MDVVPD6L.js";
import "./chunk-ZFRYLPIO.js";
import {
  ApiError
} from "./chunk-YIHLBXI6.js";

// src/index.ts
import "reflect-metadata";
import cors from "cors";
var expressBatteries = (config) => {
  expressBatteriesConfig.setConfig({ ...config });
  const app = expressBatteriesConfig.getExpressApp();
  app.use(cors(
    { ...config?.cors }
  ));
  const listen = (port) => {
    startWebSockets();
    return expressBatteriesConfig.getHttpServer().listen(
      port,
      () => {
        if (process.env.NODE_ENV !== "production") {
          console.log(
            `\u{1F680} Server ready at http://localhost:${port}`
          );
          return;
        }
        console.log("server ready");
      }
    );
  };
  return {
    express: app,
    wsServer: expressBatteriesConfig.getSocketServer(),
    listen
  };
};
export {
  ALLOWED_METHODS,
  ApiError,
  Body,
  Controller,
  ControllerSymbol,
  DECORATORS_METADATA_KEYS,
  Delete,
  ExpressBatteriesTs,
  Get,
  Head,
  Inject,
  Middleware,
  Middlewares,
  OnWsEvent,
  Options,
  Params,
  Patch,
  Post,
  Put,
  Query,
  ResponseType,
  SWAGGER_DOC,
  Trace,
  WebSocketGateWaySymbol,
  WebSocketsServer,
  WsBody,
  WsGateway,
  WsMiddlewares,
  WsServer,
  WsSocket,
  addValidationMiddleware,
  bodyMetadata,
  cacheMetadata,
  cached,
  controllerMetadata,
  createModule,
  createValidationRequestMiddleware,
  describeSetting,
  descriptionHttpCode,
  expressBatteries,
  expressBatteriesConfig,
  httpCodes,
  insertAtIndex,
  invalidateCache,
  iocMetadata,
  isValibotSchema,
  paramsMetadata,
  parse,
  queryMetadata,
  requestValidator,
  routeMetadata,
  setUpControllers,
  socketMetadata,
  startWebSockets,
  swaggerUI
};
