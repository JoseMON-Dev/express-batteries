import {
  DECORATORS_METADATA_KEYS
} from "./chunk-L5HOEFIA.js";

// src/meta/decorators/validators/validators.ts
import "reflect-metadata";
var bodyMetadata = {
  key: DECORATORS_METADATA_KEYS.BODY,
  addRouteBody: (value, target, propertyKey) => {
    if (Reflect.getMetadata(bodyMetadata.key, target, propertyKey)) {
      throw new Error(
        `Metadata ${bodyMetadata.key} already exists on ${target.constructor.name}#${typeof propertyKey === "symbol" ? propertyKey.description : propertyKey}. Body can only be defined once`
      );
    }
    Reflect.defineMetadata(bodyMetadata.key, value, target, propertyKey);
  },
  getRouteBody: (target, propertyKey) => {
    const metadata = Reflect.getMetadata(
      bodyMetadata.key,
      target,
      propertyKey
    );
    return metadata;
  }
};
var queryMetadata = {
  key: DECORATORS_METADATA_KEYS.QUERIES,
  addRouteQuery: (value, target, propertyKey) => {
    if (Reflect.getMetadata(queryMetadata.key, target, propertyKey)) {
      throw new Error(
        `Metadata ${queryMetadata.key} already exists on ${target.constructor.name}#${typeof propertyKey === "symbol" ? propertyKey.description : propertyKey}. Params can only be defined once`
      );
    }
    Reflect.defineMetadata(queryMetadata.key, value, target, propertyKey);
  },
  getRouteQuery: (target, propertyKey) => {
    const metadata = Reflect.getMetadata(
      queryMetadata.key,
      target,
      propertyKey
    );
    return metadata;
  }
};
var paramsMetadata = {
  key: DECORATORS_METADATA_KEYS.PARAMS,
  addRouteParams: (value, target, propertyKey) => {
    if (Reflect.getMetadata(paramsMetadata.key, target, propertyKey)) {
      throw new Error(
        `Metadata ${paramsMetadata.key} already exists on ${target.constructor.name}#${typeof propertyKey === "symbol" ? propertyKey.description : propertyKey}. Params can only be defined once`
      );
    }
    Reflect.defineMetadata(paramsMetadata.key, value, target, propertyKey);
  },
  getRouteParams: (target, propertyKey) => {
    const metadata = Reflect.getMetadata(
      paramsMetadata.key,
      target,
      propertyKey
    );
    return metadata;
  }
};

export {
  bodyMetadata,
  queryMetadata,
  paramsMetadata
};
