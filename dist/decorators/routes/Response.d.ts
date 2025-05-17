import { HttpMethodNumber } from '../../types/httpMethodNumer.js';
import { RequestValidationSchema } from '../../types/requestValidationSchema.js';
import { FileMimeType } from '../../types/httpfileheaders.js';
import '../../meta/httpCodes.js';
import 'valibot';

interface ResponseTypeProps {
    code: HttpMethodNumber;
    description?: string;
    schema?: object | RequestValidationSchema;
    headers?: FileMimeType[];
}
declare const ResponseType: ({ code, description, schema, headers }: ResponseTypeProps) => MethodDecorator;

export { ResponseType, type ResponseTypeProps };
