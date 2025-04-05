import type { ObjectEntries, ObjectSchema, ErrorMessage, ObjectIssue } from "valibot";

export type ValidatorDecoratorProps<T extends ObjectEntries> = {
    schema: ObjectSchema<T, ErrorMessage<ObjectIssue> | undefined>;
}