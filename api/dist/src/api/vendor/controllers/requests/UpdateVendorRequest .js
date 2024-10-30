"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVendorRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class UpdateVendorRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({
        message: 'first name is required',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(32, {
        message: 'firstname should be maximum 32 character',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateVendorRequest.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(32, {
        message: 'lastname should be maximum 32 character',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateVendorRequest.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)({
        message: 'Email Id is required',
    }),
    (0, class_validator_1.MaxLength)(96, {
        message: 'emailId should be maximum 96 character',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateVendorRequest.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)({
        message: 'mobile number is required',
    }),
    tslib_1.__metadata("design:type", Number)
], UpdateVendorRequest.prototype, "mobileNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255, {
        message: 'companyName should be maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateVendorRequest.prototype, "companyName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255, {
        message: 'companyAddress1 should be maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateVendorRequest.prototype, "companyAddress1", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255, {
        message: 'companyAddress2 should be maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateVendorRequest.prototype, "companyAddress2", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255, {
        message: 'companyCity should be maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateVendorRequest.prototype, "companyCity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(96, {
        message: 'companyEmailId should be maximum 96 character',
    }),
    tslib_1.__metadata("design:type", String)
], UpdateVendorRequest.prototype, "companyEmailId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateIf)(c => c.companyWebsite !== '' && c.companyWebsite !== null && c.companyWebsite !== undefined),
    (0, class_validator_1.Matches)(/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/, { message: 'Invalid Website Url' }),
    tslib_1.__metadata("design:type", String)
], UpdateVendorRequest.prototype, "companyWebsite", void 0);
exports.UpdateVendorRequest = UpdateVendorRequest;
//# sourceMappingURL=UpdateVendorRequest%20.js.map