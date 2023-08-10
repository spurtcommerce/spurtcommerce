"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerBackorderRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CustomerBackorderRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(32, {
        message: 'shipping first name should be maximum 32 character',
    }),
    (0, class_validator_1.MinLength)(1, {
        message: 'shipping first name should be minimum 1 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Shipping First name is required',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerBackorderRequest.prototype, "shippingFirstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(32, {
        message: 'shipping last name should be maximum 32 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerBackorderRequest.prototype, "shippingLastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(128, {
        message: 'shipping address 1  should be maximum 128 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerBackorderRequest.prototype, "shippingAddress_1", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(128, {
        message: 'shipping city should be maximum 128 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Shipping City is required',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerBackorderRequest.prototype, "shippingCity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(10, {
        message: 'shipping postcode should be maximum 10 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Shipping Post Code is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerBackorderRequest.prototype, "shippingPostCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(128, {
        message: 'shipping zone should be maximum 128 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Shipping Zone is required',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerBackorderRequest.prototype, "shippingZone", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Phone Number is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerBackorderRequest.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(96, {
        message: 'emailId should be maximum 96 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Email Id is required',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerBackorderRequest.prototype, "emailId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(128, {
        message: 'shipping address 2  should be maximum 128 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerBackorderRequest.prototype, "shippingAddress_2", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(32, {
        message: 'shipping company should be maximum 32 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerBackorderRequest.prototype, "shippingCompany", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Country is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CustomerBackorderRequest.prototype, "shippingCountryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], CustomerBackorderRequest.prototype, "productDetails", void 0);
exports.CustomerBackorderRequest = CustomerBackorderRequest;
//# sourceMappingURL=CustomerBackorderRequest.js.map