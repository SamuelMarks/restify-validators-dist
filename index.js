"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_restify_errors_1 = require("custom-restify-errors");
const tv4_1 = require("tv4");
exports.has_body = (req, res, next) => next(req.body == null ? new custom_restify_errors_1.GenericError({
    name: 'ValidationError',
    error: 'ValidationError',
    error_message: 'Body required',
    statusCode: 400
}) : void 0);
exports.mk_valid_body_mw = (json_schema, to_res = true) => (req, res, next) => {
    const body_is = tv4_1.validateMultiple(req.body, json_schema);
    if (!body_is.valid)
        (error => to_res ? res.json(400, error) : req['json_schema_error'] = error)(body_is.errors.length === 1 ? {
            error: 'ValidationError',
            error_message: body_is.errors[0].message
        } : {
            error: 'ValidationError',
            error_message: 'JSON-Schema validation failed',
            error_metadata: {
                cls: 'tv4',
                errors: body_is['errors'].map((error) => Object.assign({
                    code: error.code,
                    dataPath: error.dataPath,
                    message: error.message,
                    params: error.params,
                    schemaPath: error.schemaPath,
                    subErrors: error.subErrors
                }, process.env['DEBUG_LEVEL'] && parseInt(process.env['DEBUG_LEVEL'], 10) > 2 ?
                    { stack: error.stack } : {})),
                missing: body_is.missing,
                valid: body_is.valid
            }
        });
    return next();
};
exports.mk_valid_body_mw_ignore = (json_schema, ignore) => {
    return function valid_body(req, res, next) {
        if (!req['json_schema_error'])
            return next();
        ignore.map(filter => {
            switch (true) {
                case req['json_schema_error'].error_message.substr(0, filter.length) === filter:
                    req['json_schema_error'].delete_me = true;
                    break;
                case req['json_schema_error'].error_message === 'JSON-Schema validation failed':
                    req['json_schema_error'].error_metadata.errors =
                        req['json_schema_error'].error_metadata.errors.filter(error => error.message.substr(0, filter.length) !== filter);
                    break;
                default:
                    console.warn('Unknown dataset received instead of json_schema_error');
            }
        });
        if (req['json_schema_error'].delete_me
            || req['json_schema_error'].error_metadata
                && !req['json_schema_error'].error_metadata.errors.length)
            delete req['json_schema_error'];
        return next();
    };
};
exports.remove_from_body = (keys) => (req, res, next) => {
    keys.map(key => req.body && req.body[key] ? delete req.body[key] : null);
    return next();
};
