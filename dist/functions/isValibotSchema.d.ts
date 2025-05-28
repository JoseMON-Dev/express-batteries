import { RequestValidationSchema } from '../types/requestValidationSchema.js';
import 'valibot';

declare function isValibotSchema(obj: any): obj is RequestValidationSchema;

export { isValibotSchema };
