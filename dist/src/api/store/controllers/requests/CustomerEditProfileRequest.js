"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerEditProfileRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CustomerEditProfileRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(32, {
        message: 'firstname should be maximum 32 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'First name is required',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerEditProfileRequest.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(32, {
        message: 'lastname should be maximum 32 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerEditProfileRequest.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(96, {
        message: 'email should be maximum 96 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Email Id is required',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email' }),
    tslib_1.__metadata("design:type", String)
], CustomerEditProfileRequest.prototype, "emailId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateIf)(o => o.phoneNumber !== ''),
    (0, class_validator_1.MaxLength)(15, {
        message: 'Phone Number should be maximum 15 character',
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerEditProfileRequest.prototype, "phoneNumber", void 0);
exports.CustomerEditProfileRequest = CustomerEditProfileRequest;
//# sourceMappingURL=CustomerEditProfileRequest.js.map