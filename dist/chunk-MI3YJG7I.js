import {
  DECORATORS_METADATA_KEYS
} from "./chunk-L5HOEFIA.js";

// src/meta/decorators/ioc.ts
import "reflect-metadata";
var iocMetadata = {
  getAllDependencies: (target, propertyKey) => {
    return Reflect.getMetadata(
      DECORATORS_METADATA_KEYS.IOC_CONTAINER_KEYS,
      target,
      propertyKey
    ) || [];
  },
  addDependency: (target, propertyKey, dependency) => {
    const allDependencies = iocMetadata.getAllDependencies(
      target,
      propertyKey
    );
    allDependencies.push(dependency);
    Reflect.defineMetadata(
      DECORATORS_METADATA_KEYS.IOC_CONTAINER_KEYS,
      [...allDependencies],
      target,
      propertyKey
    );
  }
};

export {
  iocMetadata
};
