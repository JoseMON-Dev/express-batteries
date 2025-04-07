declare const httpCodes: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly ACCEPTED: 202;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly METHOD_NOT_ALLOWED: 405;
    readonly CONFLICT: 409;
    readonly INTERNAL_SERVER_ERROR: 500;
};
declare const descriptionHttpCode: {
    readonly 200: "OK";
    readonly 201: "Created";
    readonly 202: "Accepted";
    readonly 204: "No Content";
    readonly 400: "Bad Request";
    readonly 401: "Unauthorized";
    readonly 403: "Forbidden";
    readonly 404: "Not Found";
    readonly 405: "Method Not Allowed";
    readonly 409: "Conflict";
    readonly 500: "Internal Server Error";
    readonly 501: "Not Implemented";
};

export { descriptionHttpCode, httpCodes };
