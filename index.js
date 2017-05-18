"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tv4_1 = require("tv4");
exports.has_body = function (req, res, next) {
    if (!req.body)
        res.json(400, { error: 'ValidationError', error_message: 'Body required' });
    return next();
};
exports.mk_valid_body_mw = function (json_schema, to_res) {
    if (to_res === void 0) { to_res = true; }
    return function (req, res, next) {
        var body_is = tv4_1.validateMultiple(req.body, json_schema);
        if (!body_is.valid)
            (function (error) { return to_res ? res.json(400, error) : req['json_schema_error'] = error; })(body_is.errors.length === 1 ? {
                error: 'ValidationError',
                error_message: body_is.errors[0]['message']
            } : {
                error: 'ValidationError',
                error_message: 'JSON-Schema validation failed',
                error_metadata: {
                    cls: 'tv4',
                    errors: body_is['errors'].map(function (error) {
                        return Object.assign({
                            code: error.code,
                            dataPath: error.dataPath,
                            message: error.message,
                            params: error.params,
                            schemaPath: error.schemaPath,
                            subErrors: error.subErrors
                        }, process.env['DEBUG_LEVEL'] && parseInt(process.env['DEBUG_LEVEL'], 10) > 2 ? { stack: error.stack } : {});
                    }),
                    missing: body_is['missing'],
                    valid: body_is['valid']
                }
            });
        return next();
    };
};
exports.mk_valid_body_mw_ignore = function (json_schema, ignore) {
    return function valid_body(req, res, next) {
        if (!req['json_schema_error'])
            return next();
        ignore.map(function (filter) {
            switch (true) {
                case req['json_schema_error'].error_message.substr(0, filter.length) === filter:
                    req['json_schema_error'].delete_me = true;
                    break;
                case req['json_schema_error'].error_message === 'JSON-Schema validation failed':
                    req['json_schema_error'].error_metadata.errors =
                        req['json_schema_error'].error_metadata.errors.filter(function (error) {
                            return error.message.substr(0, filter.length) !== filter;
                        });
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
exports.remove_from_body = function (keys) {
    return function (req, res, next) {
        keys.map(function (key) { return req.body && req.body[key] ? delete req.body[key] : null; });
        return next();
    };
};
