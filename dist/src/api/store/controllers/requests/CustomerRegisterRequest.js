"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRegisterRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CustomerRegisterRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'firstname is required',
    }),
    (0, class_validator_1.MaxLength)(32, {
        message: 'firstname should be maximum 32 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerRegisterRequest.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MinLength)(8, {
        message: 'password must contain minimum 8 character',
    }),
    (0, class_validator_1.Matches)(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/, { message: 'Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 or at most 128 characters' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'password is required',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerRegisterRequest.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CustomerRegisterRequest.prototype, "confirmPassword", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(96, {
        message: 'emailId should be maximum 96 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Email Id is required',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerRegisterRequest.prototype, "emailId", void 0);
exports.CustomerRegisterRequest = CustomerRegisterRequest;
//# sourceMappingURL=CustomerRegisterRequest.js.map