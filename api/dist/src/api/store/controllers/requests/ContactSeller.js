"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSeller = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class ContactSeller {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'vendorId is required',
    }),
    tslib_1.__metadata("design:type", Number)
], ContactSeller.prototype, "vendorId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'name should be maximum 255 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'name is required',
    }),
    tslib_1.__metadata("design:type", String)
], ContactSeller.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(96, {
        message: 'Email Id should be maximum 96 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Email Id is required',
    }),
    tslib_1.__metadata("design:type", String)
], ContactSeller.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MinLength)(6, {
        message: 'mobile number should be minimum 6 character',
    }),
    (0, class_validator_1.MaxLength)(15, {
        message: 'mobile number should be maximum 15 character',
    }),
    tslib_1.__metadata("design:type", String)
], ContactSeller.prototype, "mobileNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'country is required',
    }),
    tslib_1.__metadata("design:type", String)
], ContactSeller.prototype, "country", void 0);
exports.ContactSeller = ContactSeller;
//# sourceMappingURL=ContactSeller.js.map