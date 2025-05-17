import {
  httpCodes
} from "./chunk-2WIR5VWA.js";
import {
  parse
} from "./chunk-7K7W34ZL.js";
import {
  expressBatteriesConfig
} from "./chunk-MDVVPD6L.js";

// src/middlewares/requestValidator.ts
var requestValidator = ({ bodySchema, paramsSchema, querySchema }) => async (req, _, next) => {
  const BadRequestError = expressBatteriesConfig.getConfig().ErrorClass;
  if (BadRequestError === void 0 || BadRequestError === null) {
    throw new Error(
      "expressBatteriesConfig is not defined errorClass is required"
    );
  }
  const errors = [];
  if (bodySchema) {
    if (!req.body) {
      return next(
        new BadRequestError(
          "Missing request body",
          ["Missing request body"],
          httpCodes.BAD_REQUEST
        )
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
          httpCodes.BAD_REQUEST
        )
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
          httpCodes.BAD_REQUEST
        )
      );
    }
    const result = parse(querySchema, req.query);
    if (!result.success) errors.push(...result.errors);
    else req.query = result.data;
  }
  if (errors.length > 0) {
    return next(
      new BadRequestError(
        "Bad Request Error",
        errors,
        httpCodes.BAD_REQUEST
      )
    );
  }
  next();
};

export {
  requestValidator
};
