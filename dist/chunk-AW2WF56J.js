import {
  socketMetadata
} from "./chunk-KUDJHQNN.js";
import {
  insertAtIndex
} from "./chunk-TBII24RB.js";

// src/sockets/decorators/onWebSocketEvent.ts
function OnWsEvent(event) {
  return (target, propertyKey) => {
    const dependencyIndexDict = socketMetadata.getParameterIndexDict(
      target.constructor
    );
    const indexesMap = dependencyIndexDict.get(propertyKey) || /* @__PURE__ */ new Map();
    const server = socketMetadata.getServer();
    const handlerParams = /* @__PURE__ */ new Map();
    handlerParams.set("server", server);
    const dependencyArray = [];
    const middlewares = socketMetadata.getMiddlewaresList(
      target,
      propertyKey
    );
    const fnHandler = (socket) => async (initialBody) => {
      const context = { body: initialBody };
      handlerParams.set("body", context.body);
      handlerParams.set("socket", socket);
      const fn = target[propertyKey];
      const socketGateWayInstance = socketMetadata.getGateWayInstance(
        target.constructor
      );
      const handler = fn.bind(socketGateWayInstance);
      let next = async () => {
        handlerParams.set("body", context.body);
        for (const [paramName, index] of indexesMap) {
          insertAtIndex(
            dependencyArray,
            index,
            handlerParams.get(paramName),
            true
          );
        }
        await handler(...dependencyArray);
      };
      for (let i = middlewares.length - 1; i >= 0; i--) {
        const current = middlewares[i];
        if (!current) {
          throw new Error(
            "Invalid middleware found undefined at run event " + event
          );
        }
        const prevNext = next;
        next = async () => {
          await current(
            server,
            socket,
            context,
            prevNext
          );
        };
      }
      await next();
    };
    socketMetadata.addEventHandler({
      event,
      handler: fnHandler
    }, target.constructor);
  };
}

export {
  OnWsEvent
};
