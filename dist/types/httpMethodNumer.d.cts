import { httpCodes } from '../meta/httpCodes.cjs';

type HttpMethodNumber = (typeof httpCodes)[keyof typeof httpCodes];

export type { HttpMethodNumber };
