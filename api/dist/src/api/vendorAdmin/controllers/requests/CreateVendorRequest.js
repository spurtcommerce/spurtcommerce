"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVendorRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateVendorRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateVendorRequest.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateVendorRequest.prototype, "mobileNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MinLength)(8, {
        message: 'password is minimum 8 character',
    }),
    (0, class_validator_1.Matches)(/^(?=.*?[A-Z])(?=.*?[a-z])((?=.*?[0-9])|(?=.*?[#?!@$%^&*-])).{8,128}$/, { message: 'Password must contain at least one number or one symbol or one uppercase and lowercase letter, and at least 8 and at most 128 characters' }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'password is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateVendorRequest.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateVendorRequest.prototype, "confirmPassword", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateVendorRequest.prototype, "mailStatus", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateVendorRequest.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateVendorRequest.prototype, "vendorGroupId", void 0);
exports.CreateVendorRequest = CreateVendorRequest;
//# sourceMappingURL=CreateVendorRequest.js.map