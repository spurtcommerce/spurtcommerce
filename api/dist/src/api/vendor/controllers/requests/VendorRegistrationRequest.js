"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRegisterRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class VendorRegisterRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'firstname is required',
    }),
    (0, class_validator_1.MaxLength)(32, {
        message: 'firstname should be maximum 32 character',
    }),
    tslib_1.__metadata("design:type", String)
], VendorRegisterRequest.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MinLength)(8, {
        message: 'password must contain minimum 8 character',
    }),
    (0, class_validator_1.Matches)(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/, { message: 'Password must contain at least one number or one symbol and one uppercase and lowercase letter, and at least 8 or at most 128 characters' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'password is required',
    }),
    tslib_1.__metadata("design:type", String)
], VendorRegisterRequest.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Email Id is required',
    }),
    (0, class_validator_1.MaxLength)(96, {
        message: 'emailId should be maximum 96 character',
    }),
    tslib_1.__metadata("design:type", String)
], VendorRegisterRequest.prototype, "emailId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Company name is required',
    }),
    tslib_1.__metadata("design:type", String)
], VendorRegisterRequest.prototype, "companyName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], VendorRegisterRequest.prototype, "otp", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], VendorRegisterRequest.prototype, "industryId", void 0);
exports.VendorRegisterRequest = VendorRegisterRequest;
//# sourceMappingURL=VendorRegistrationRequest.js.map