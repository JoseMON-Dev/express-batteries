import { RequestValidationSchema } from '../types/requestValidationSchema.cjs';
import 'valibot';

declare function isValibotSchema(obj: any): obj is RequestValidationSchema;

export { isValibotSchema };
