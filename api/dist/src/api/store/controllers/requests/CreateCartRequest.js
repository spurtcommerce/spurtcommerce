"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCartRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
require("reflect-metadata");
class CreateCartRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'productId is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateCartRequest.prototype, "productId", void 0);
exports.CreateCartRequest = CreateCartRequest;
//# sourceMappingURL=CreateCartRequest.js.map