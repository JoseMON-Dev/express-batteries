import { ObjectEntries, ObjectSchema, ErrorMessage, ObjectIssue } from 'valibot';

type ValidatorDecoratorProps<T extends ObjectEntries> = {
    schema: ObjectSchema<T, ErrorMessage<ObjectIssue> | undefined>;
};

export type { ValidatorDecoratorProps };
