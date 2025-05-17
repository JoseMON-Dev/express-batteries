import { ObjectEntries, ObjectSchema, ErrorMessage, ObjectIssue } from 'valibot';

type BodyObjectHEaders = "application/json" | "application/xml" | "text/xml" | "text/csv" | (string & {});
declare function Body<T extends ObjectEntries>(schema: ObjectSchema<T, ErrorMessage<ObjectIssue> | undefined>): MethodDecorator;

export { Body, type BodyObjectHEaders };
