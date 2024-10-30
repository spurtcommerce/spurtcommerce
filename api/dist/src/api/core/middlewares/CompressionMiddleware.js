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
exports.CompressionMiddleware = void 0;
const tslib_1 = require("tslib");
const compression_1 = tslib_1.__importDefault(require("compression"));
const routing_controllers_1 = require("routing-controllers");
let CompressionMiddleware = class CompressionMiddleware {
    use(req, res, next) {
        return (0, compression_1.default)()(req, res, next);
    }
};
CompressionMiddleware = tslib_1.__decorate([
    (0, routing_controllers_1.Middleware)({ type: 'before' })
], CompressionMiddleware);
exports.CompressionMiddleware = CompressionMiddleware;
//# sourceMappingURL=CompressionMiddleware.js.map