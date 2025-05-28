import { ObjectEntries, ObjectSchema, ErrorMessage, ObjectIssue } from 'valibot';

declare const parse: <T extends ObjectEntries>(schema: ObjectSchema<T, ErrorMessage<ObjectIssue> | undefined>, data: Record<string, any>) => {
    success: boolean;
    errors: string[];
    data: Record<string, any>;
};

export { parse };
