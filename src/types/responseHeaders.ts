export type ResponseHeaderName =
    | "Access-Control-Allow-Origin"
    | "Access-Control-Allow-Credentials"
    | "Access-Control-Allow-Methods"
    | "Access-Control-Allow-Headers"
    | "Access-Control-Expose-Headers"
    | "Accept-Patch"
    | "Accept-Ranges"
    | "Age"
    | "Allow"
    | "Cache-Control"
    | "Connection"
    | "Content-Disposition"
    | "Content-Encoding"
    | "Content-Language"
    | "Content-Length"
    | "Content-Location"
    | "Content-Range"
    | "Content-Type"
    | "Date"
    | "ETag"
    | "Expires"
    | "Last-Modified"
    | "Link"
    | "Location"
    | "Proxy-Authenticate"
    | "Retry-After"
    | "Server"
    | "Set-Cookie"
    | "Strict-Transport-Security"
    | "Trailer"
    | "Transfer-Encoding"
    | "Upgrade"
    | "Vary"
    | "Via"
    | "WWW-Authenticate"
    | "X-Content-Type-Options"
    | "X-DNS-Prefetch-Control"
    | "X-Frame-Options"
    | "X-Permitted-Cross-Domain-Policies"
    | "X-Powered-By"
    | "X-RateLimit-Limit"
    | "X-RateLimit-Remaining"
    | "X-RateLimit-Reset"
    | "X-Request-ID"
    | "X-XSS-Protection"
    | (string & {});
