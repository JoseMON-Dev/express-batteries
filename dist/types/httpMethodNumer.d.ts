import { httpCodes } from '../meta/httpCodes.js';

type HttpMethodNumber = (typeof httpCodes)[keyof typeof httpCodes];

export type { HttpMethodNumber };
