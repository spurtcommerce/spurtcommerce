"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerMiddleware = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const class_validator_1 = require("class-validator");
const Logger_1 = require("../../../decorators/Logger");
const env_1 = require("../../../env");
let ErrorHandlerMiddleware = class ErrorHandlerMiddleware {
    constructor(log) {
        this.log = log;
        this.isProduction = env_1.env.isProduction;
    }
    /**
     * Error handler - sets response code and sends json with error message.
     * Handle: standard node error, HttpError, ValidationError and string.
     *
     * @param {any} error An throwed object (error)
     * @param {express.Request} req The Express request object
     * @param {express.Response} res The Express response object
     * @param {express.NextFunction} next The next Express middleware function
     */
    error(error, _req, res, _next) {
        const responseObject = {};
        // if its an array of ValidationError
        if (error && Array.isArray(error.errors) && error.errors.every((element) => element instanceof class_validator_1.ValidationError)) {
            res.status(422);
            responseObject.message = "You have an error in your request's body. Check 'errors' field for more details!";
            responseObject.status = 0;
            responseObject.data = {};
            responseObject.data.message = [];
            error.errors.forEach((element) => {
                Object.keys(element.constraints).forEach((type) => {
                    responseObject.data.message.push(`property ${element.constraints[type]}`);
                });
            });
        }
        else {
            // set http status
            if (error instanceof routing_controllers_1.HttpError && error.httpCode) {
                res.status(error.httpCode);
            }
            else {
                res.status(500);
            }
            if (error instanceof Error) {
                const developmentMode = !this.isProduction;
                // set response error fields
                if (error.name && (developmentMode || error.message)) { // show name only if in development mode and if error message exist too
                    responseObject.name = error.name;
                }
                switch (error.name) {
                    case 'AuthorizationRequiredError':
                        responseObject.message = 'Unauthorized';
                        break;
                    default:
                        responseObject.message = error.message;
                        break;
                }
                if (error.stack && developmentMode) {
                    responseObject.stack = error.stack;
                }
            }
            else if (typeof error === 'string') {
                responseObject.message = error;
            }
        }
        if (this.isProduction) {
            this.log.error(error.name, error.message);
        }
        else {
            this.log.error(error.name, error.stack);
        }
        res.json(responseObject);
    }
};
ErrorHandlerMiddleware = tslib_1.__decorate([
    (0, routing_controllers_1.Middleware)({ type: 'after' }),
    tslib_1.__param(0, (0, Logger_1.Logger)(__filename)),
    tslib_1.__metadata("design:paramtypes", [Object])
], ErrorHandlerMiddleware);
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
//# sourceMappingURL=ErrorHandlerMiddleware.js.map