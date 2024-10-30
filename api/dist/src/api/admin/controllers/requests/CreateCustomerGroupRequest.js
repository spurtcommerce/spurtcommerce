"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerGroup = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateCustomerGroup {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(30, {
        message: 'name should be maximum 30 characters',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'name is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateCustomerGroup.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'colorcode is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateCustomerGroup.prototype, "colorcode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'status is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateCustomerGroup.prototype, "status", void 0);
exports.CreateCustomerGroup = CreateCustomerGroup;
//# sourceMappingURL=CreateCustomerGroupRequest.js.map