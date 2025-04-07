import { HttpMethodNumber } from '../../types/httpMethodNumer.cjs';
import { RequestValidationSchema } from '../../types/requestValidationSchema.cjs';
import { FileMimeType } from '../../types/httpfileheaders.cjs';
import '../../meta/httpCodes.cjs';
import 'valibot';

interface ResponseTypeProps {
    code: HttpMethodNumber;
    description?: string;
    schema?: object | RequestValidationSchema;
    headers?: FileMimeType[];
}
declare const ResponseType: ({ code, description, schema, headers }: ResponseTypeProps) => MethodDecorator;

export { ResponseType, type ResponseTypeProps };
