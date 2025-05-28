import { ObjectEntries, ObjectSchema, ErrorMessage, ObjectIssue } from 'valibot';

declare function Query<T extends ObjectEntries>(schema: ObjectSchema<T, ErrorMessage<ObjectIssue> | undefined>): MethodDecorator;

export { Query };
