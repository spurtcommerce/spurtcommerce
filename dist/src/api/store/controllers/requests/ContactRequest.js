"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class ContactRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'name should be maximum 255 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'name is required',
    }),
    tslib_1.__metadata("design:type", String)
], ContactRequest.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(96, {
        message: 'Email Id should be maximum 96 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Email Id is required',
    }),
    tslib_1.__metadata("design:type", String)
], ContactRequest.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(15, {
        message: 'Phone Number should be maximum 15 character',
    }),
    (0, class_validator_1.ValidateIf)(o => o.phoneNumber !== ''),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Phone Number is required',
    }),
    tslib_1.__metadata("design:type", String)
], ContactRequest.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MinLength)(6, {
        message: 'Message should be minimum 6 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Message is required',
    }),
    tslib_1.__metadata("design:type", String)
], ContactRequest.prototype, "message", void 0);
exports.ContactRequest = ContactRequest;
//# sourceMappingURL=ContactRequest.js.map