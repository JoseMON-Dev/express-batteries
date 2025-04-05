import {
    type ErrorMessage,
    type ObjectEntries,
    type ObjectIssue,
    type ObjectSchema,
    safeParse,
} from "valibot";

export const parse = <T extends ObjectEntries>(
    schema: ObjectSchema<T, ErrorMessage<ObjectIssue> | undefined>,
    data: Record<string, any>,
): {
    success: boolean;
    errors: string[];
    data: Record<string, any>;
} => {
    const errors: string[] = [];
    const result = safeParse(schema, data);
    if (!result.success) {
        errors.push(...result.issues.map((issue) => issue.message));
        return { success: false, errors, data: {} };
    }
    return { success: true, errors, data };
};
