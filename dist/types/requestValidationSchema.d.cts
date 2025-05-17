import { ObjectSchema, ObjectEntries, ErrorMessage, ObjectIssue } from 'valibot';

type RequestValidationSchema = ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue>>;

export type { RequestValidationSchema };
