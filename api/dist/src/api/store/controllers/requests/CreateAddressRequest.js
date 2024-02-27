"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerAddress = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CustomerAddress {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(128, {
        message: 'address1 should be maximum 128 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'address1 is required',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerAddress.prototype, "address1", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(128, {
        message: 'address2 should be maximum 128 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerAddress.prototype, "address2", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(128, {
        message: 'city should be maximum 128 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'city is required',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerAddress.prototype, "city", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(128, {
        message: 'state should be maximum 128 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerAddress.prototype, "state", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(6, {
        message: 'postcode should be maximum 6 character',
    }),
    (0, class_validator_1.ValidateIf)(o => o.postcode !== ''),
    tslib_1.__metadata("design:type", Number)
], CustomerAddress.prototype, "postcode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], CustomerAddress.prototype, "countryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(32, {
        message: 'company should be maximum 32 character',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerAddress.prototype, "company", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'addressType is required',
    }),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], CustomerAddress.prototype, "addressType", void 0);
exports.CustomerAddress = CustomerAddress;
//# sourceMappingURL=CreateAddressRequest.js.map