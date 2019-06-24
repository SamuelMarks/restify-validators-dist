/* tslint:disable:no-reference-import */
/// <reference types="tv4" />
import * as restify from 'restify';
import { JsonSchema, MultiResult } from 'tv4';

export declare const has_body: (req: restify.Request, res: restify.Response, next: restify.Next) => any;
export declare const mk_valid_body_mw: (json_schema: JsonSchema, to_res?: boolean) =>
    (req: restify.Request, res: restify.Response, next: restify.Next) => any;
export declare const mk_valid_body_mw_ignore: (json_schema: JsonSchema, ignore: string[]) =>
    (req: restify.Request, res: restify.Response, next: restify.Next) => any;
export declare const remove_from_body: (keys: string[]) =>
    (req: restify.Request, res: restify.Response, next: restify.Next) => any;

export type CustomJsonError =
    {error: string, error_message: string}
    | {error: string, error_message: string, error_metadata: {}};
export declare const jsonSchemaErrorParser: (body_is: MultiResult) => CustomJsonError;

export declare const jsonSchemaNamedArrayOf: (json_schema: tv4.JsonSchema, type_name?: string, type_plural?: string) => tv4.JsonSchema;
