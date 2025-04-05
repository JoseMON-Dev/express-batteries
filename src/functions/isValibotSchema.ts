import type { RequestValidationSchema } from "../types/requestValidationSchema";

export function isValibotSchema(
    obj: any,
): obj is RequestValidationSchema {
    return obj.kind === "schema";
}
