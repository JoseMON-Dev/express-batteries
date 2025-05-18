// src/sockets/meta/socketMetadata.ts
import "reflect-metadata";
import "inversify";
var webSocketGateWayList = [];
var socketMetadata = {
  EVENT: "ws:event",
  GATEWAY_INSTANCE: "ws:Gateway",
  IOC_CONTAINER: "ws:IOC_Container",
  PARAMETERS_INDEX_DICT: "ws:class:server:parameterKey",
  HANDLERS: "ws:handlers",
  MIDDLEWARES: "ws:middlewares:fn",
  IS_GATEWAY: "ws:isgateWay",
  addMiddlewares: (target, propertyKey, list) => {
    Reflect.defineMetadata(
      socketMetadata.MIDDLEWARES,
      list,
      target,
      propertyKey
    );
  },
  getMiddlewaresList: (target, propertyKey) => {
    const middlewares = Reflect.getMetadata(
      socketMetadata.MIDDLEWARES,
      target,
      propertyKey
    ) || [];
    return middlewares;
  },
  setIsGateWay: (constructor) => {
    Reflect.defineMetadata(socketMetadata.IS_GATEWAY, true, constructor);
  },
  isGateWay: (constructor) => {
    return Reflect.getMetadata(socketMetadata.IS_GATEWAY, constructor) || false;
  },
  addGateWay: (constructor) => {
    webSocketGateWayList.push(constructor);
  },
  getGateWayList: () => {
    return webSocketGateWayList;
  },
  setIOCContainer: (constructor, container) => {
    Reflect.defineMetadata(
      socketMetadata.IOC_CONTAINER,
      container,
      constructor
    );
  },
  getIOCContainer: (constructor) => {
    return Reflect.getMetadata(
      socketMetadata.IOC_CONTAINER,
      constructor
    );
  },
  getGateWayInstance: (constructor) => {
    const container = socketMetadata.getIOCContainer(constructor);
    const gateWay = Reflect.getMetadata(
      socketMetadata.GATEWAY_INSTANCE,
      constructor
    ) || container !== void 0 ? container?.get(
      Symbol.for(constructor.name)
    ) : void 0;
    Reflect.defineMetadata(
      socketMetadata.GATEWAY_INSTANCE,
      gateWay,
      constructor
    );
    return gateWay;
  },
  addHandlerParameterIndex: (constructor, propertyKey, parameterIndex, wsHandlerParam) => {
    const map = socketMetadata.getParameterIndexDict(constructor);
    const props = map.get(propertyKey) || /* @__PURE__ */ new Map();
    props.set(wsHandlerParam, parameterIndex);
    map.set(propertyKey, props);
  },
  getParameterIndexDict: (target) => {
    const map = Reflect.getMetadata(
      socketMetadata.PARAMETERS_INDEX_DICT,
      target
    ) || /* @__PURE__ */ new Map();
    Reflect.defineMetadata(
      socketMetadata.PARAMETERS_INDEX_DICT,
      map,
      target
    );
    return map;
  },
  getAllEventHandlers: (constructor) => {
    return Reflect.getMetadata(socketMetadata.HANDLERS, constructor) || [];
  },
  addEventHandler: (handler, constructor) => {
    const handlers = socketMetadata.getAllEventHandlers(constructor);
    Reflect.defineMetadata(
      socketMetadata.HANDLERS,
      [...handlers, handler],
      constructor
    );
  }
};

export {
  socketMetadata
};
