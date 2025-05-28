import { ServiceIdentifier, OptionalGetOptions } from 'inversify';

declare const Inject: <T>(dependencySymbol: ServiceIdentifier<T>, options?: OptionalGetOptions) => ParameterDecorator;

export { Inject };
