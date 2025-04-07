import { DescribeRouteOptions } from '../../types/openApi.js';
import 'openapi-types';
import 'valibot';

declare const Get: (path: `/${string}` | "/", props?: Omit<DescribeRouteOptions, "method">) => MethodDecorator;
declare const Post: (path: `/${string}` | "/", props?: Omit<DescribeRouteOptions, "method">) => MethodDecorator;
declare const Put: (path: `/${string}` | "/", props?: Omit<DescribeRouteOptions, "method">) => MethodDecorator;
declare const Delete: (path: `/${string}` | "/", props?: Omit<DescribeRouteOptions, "method">) => MethodDecorator;
declare const Patch: (path: `/${string}` | "/", props?: Omit<DescribeRouteOptions, "method">) => MethodDecorator;
declare const Head: (path: `/${string}` | "/", props?: Omit<DescribeRouteOptions, "method">) => MethodDecorator;
declare const Options: (path: `/${string}` | "/", props?: Omit<DescribeRouteOptions, "method">) => MethodDecorator;
declare const Trace: (path: `/${string}` | "/", props?: Omit<DescribeRouteOptions, "method">) => MethodDecorator;

export { Delete, Get, Head, Options, Patch, Post, Put, Trace };
