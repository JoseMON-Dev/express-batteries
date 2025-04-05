import type { ObjectSchema, ObjectEntries, ErrorMessage, ObjectIssue } from "valibot";

export type RequestValidationSchema = ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue>> 