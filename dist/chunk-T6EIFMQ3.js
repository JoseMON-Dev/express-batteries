import {
  iocMetadata
} from "./chunk-MI3YJG7I.js";

// src/decorators/ioc/Inject.ts
var Inject = (dependencySymbol, options) => {
  return (target, propertyKey, parameterIndex) => {
    if (propertyKey && parameterIndex) {
      iocMetadata.addDependency(target, propertyKey, {
        dependencySymbol,
        options,
        index: parameterIndex
      });
    }
  };
};

export {
  Inject
};
