import type { httpCodes } from "../meta/httpCodes";

export type HttpMethodNumber = (typeof httpCodes)[keyof typeof httpCodes]
