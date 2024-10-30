"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomer = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateCustomer {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateCustomer.prototype, "customerGroupId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(32, {
        message: ' username should be maximum 32 characters',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomer.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(96, {
        message: 'email should be maximum 96 characters',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateCustomer.prototype, "email", void 0);
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
], CreateCustomer.prototype, "mobileNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MinLength)(8, {
        message: 'password must contain minimum 8 character',
    }),
    (0, class_validator_1.Matches)(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/, { message: 'Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'password is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateCustomer.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MinLength)(8, {
        message: 'confirm password must contain minimum 8 character',
    }),
    (0, class_validator_1.Matches)(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/, { message: 'Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 and at most 128 characters' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'confirm password is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateCustomer.prototype, "confirmPassword", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateCustomer.prototype, "mailStatus", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateCustomer.prototype, "status", void 0);
exports.CreateCustomer = CreateCustomer;
//# sourceMappingURL=CreateCustomerRequest.js.map