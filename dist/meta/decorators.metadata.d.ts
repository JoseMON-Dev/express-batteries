declare const DECORATORS_METADATA_KEYS: {
    readonly BODY: "router:body";
    readonly PARAMS: "router:params";
    readonly QUERIES: "router:queries";
    readonly MIDDLEWARES: "router:middlewares";
    readonly PATH: "router:path";
    readonly ROUTER: "router:router";
    readonly HAVE_VALIDATION: "router:haveValidation";
    readonly ROUTES_OPENAPI_INFO: "openapi:routesOpenApiInfo";
    readonly CONTROLLER_ROUTES_INFO: "openapi:controllerRoutesInfo";
    readonly ROUTE_RESPONSE: "openapi:routeResponse";
    readonly IOC_CONTAINER_KEYS: "IOC:iocContainerKeys";
    readonly IOC_CONTAINER: "IOC:iocContainer";
    readonly IOC_CONTROLLER_INSTANCE: "controller:instance";
};

export { DECORATORS_METADATA_KEYS };
