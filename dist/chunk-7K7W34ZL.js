// src/functions/parse.ts
import {
  safeParse
} from "valibot";
var parse = (schema, data) => {
  const errors = [];
  const result = safeParse(schema, data);
  if (!result.success) {
    errors.push(...result.issues.map((issue) => issue.message));
    return { success: false, errors, data: {} };
  }
  return { success: true, errors, data };
};

export {
  parse
};
