

export const DECORATORS_METADATA_KEYS = {
  BODY: 'router:body',
  PARAMS: 'router:params',
  QUERIES: 'router:queries',
  MIDDLEWARES: 'router:middlewares',
  PATH: 'router:path',
  ROUTER: 'router:router',
  HAVE_VALIDATION: 'router:haveValidation',
  ROUTES_OPENAPI_INFO: 'openapi:routesOpenApiInfo',
  CONTROLLER_ROUTES_INFO: 'openapi:controllerRoutesInfo',
  ROUTE_RESPONSE: 'openapi:routeResponse',
  IOC_CONTAINER_KEYS: 'IOC:iocContainerKeys',
  IOC_CONTAINER: 'IOC:iocContainer',
} as const;