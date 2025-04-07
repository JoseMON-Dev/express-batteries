import { ObjectEntries, ObjectSchema, ErrorMessage, ObjectIssue } from 'valibot';

declare function Params<T extends ObjectEntries>(schema: ObjectSchema<T, ErrorMessage<ObjectIssue> | undefined>): MethodDecorator;

export { Params };
