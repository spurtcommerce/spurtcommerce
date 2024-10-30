"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderStatus = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateOrderStatus {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(32, {
        message: 'Name should be maximum 32 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'name is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateOrderStatus.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'Name should be maximum 255 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'colorCode is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateOrderStatus.prototype, "colorCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'status is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateOrderStatus.prototype, "status", void 0);
exports.CreateOrderStatus = CreateOrderStatus;
//# sourceMappingURL=CreateOrderStatusRequest.js.map