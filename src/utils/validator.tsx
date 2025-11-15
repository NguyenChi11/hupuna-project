import { ZodType } from "zod";

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

/**
 * Validate data theo schema Zod
 * @param schema Zod schema
 * @param data object cần validate
 * @returns object { isValid, errors, values }
 */
export function validateData<T>(
    schema: ZodType<T>, // dùng ZodType<T>
    data: unknown
): { isValid: boolean; errors: ValidationErrors<T>; values?: T } {
    const result = schema.safeParse(data);

    if (!result.success) {
        const errors: ValidationErrors<T> = {};
        result.error.issues.forEach((issue) => {
            const field = issue.path[0] as keyof T;
            errors[field] = issue.message;
            console.log('field', field)
        });
        return { isValid: false, errors};
    }

    return { isValid: true, errors: {}, values: result.data };
}

/**
 * Helper để lấy lỗi theo field
 */
export function getError<T>(
    errors: ValidationErrors<T>,
    field: keyof T
): string | undefined {
    return errors[field];
}