"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomer = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class UpdateCustomer {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], UpdateCustomer.prototype, "customerGroupId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(96, {
        message: 'user should be maximum 96 characters',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateCustomer.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(96, {
        message: 'email should be maximum 96 characters',
    }),
    (0, class_validator_1.IsEmail)(),
    tslib_1.__metadata("design:type", String)
], UpdateCustomer.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(15, {
        message: 'mobile number should be maximum 15 characters',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'mobile number is required',
    }),
    (0, class_validator_1.MinLength)(6, {
        message: 'mobile number should be minimum 6 character',
    }),
    tslib_1.__metadata("design:type", Number)
], UpdateCustomer.prototype, "mobileNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], UpdateCustomer.prototype, "mailStatus", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'mobile number is required',
    }),
    tslib_1.__metadata("design:type", Number)
], UpdateCustomer.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], UpdateCustomer.prototype, "siteId", void 0);
exports.UpdateCustomer = UpdateCustomer;
//# sourceMappingURL=UpdateCustomerRequest.js.map