import {
  routeMetadata
} from "./chunk-4M4IRHAX.js";
import {
  descriptionHttpCode
} from "./chunk-2WIR5VWA.js";
import {
  isValibotSchema
} from "./chunk-O3QR3TO7.js";

// src/decorators/routes/Response.ts
import toJsonSchema from "to-json-schema";
import cleanDeep from "clean-deep";
var ResponseType = ({ code, description, schema, headers }) => {
  const obj = schema;
  const responses = {};
  let content;
  if (obj) {
    const head = headers || ["application/json"];
    const schema2 = isValibotSchema(obj) ? obj : JSON.parse(JSON.stringify(toJsonSchema(obj)));
    content = head.reduce((acc, head2) => {
      acc[head2] = {
        schema: schema2
      };
      return acc;
    }, {});
  }
  if (content) {
    responses[code] = {
      description: description || descriptionHttpCode[code],
      content
    };
  } else {
    responses[code] = {
      description: description || descriptionHttpCode[code],
      content: headers ? headers.reduce((acc, head) => {
        acc[head] = {
          schema
        };
        return acc;
      }, {}) : void 0
    };
  }
  return (target, propertyKey) => {
    const routesOpenApiInfo = routeMetadata.getRoutesOpenApiInfo(
      target,
      propertyKey
    );
    const cleanedResponses = cleanDeep(responses, {
      emptyArrays: false,
      emptyObjects: false,
      emptyStrings: false
    });
    if (routesOpenApiInfo) {
      routeMetadata.saveRoutesOpenApiInfo(
        {
          ...routesOpenApiInfo,
          routeOptions: {
            ...routesOpenApiInfo.routeOptions,
            responses: {
              ...routesOpenApiInfo.routeOptions.responses,
              ...cleanedResponses
            }
          }
        },
        target,
        propertyKey
      );
    } else {
      routeMetadata.saveRoutesOpenApiInfo(
        {
          routeOptions: {
            responses: { ...cleanedResponses }
          }
        },
        target,
        propertyKey
      );
    }
  };
};

export {
  ResponseType
};
