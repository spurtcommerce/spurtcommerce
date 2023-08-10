"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationRequest = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class QuotationRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.Max)(999999999, {
        message: 'quantity should be maximum 9 digit',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], QuotationRequest.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], QuotationRequest.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'orderValue should be maximum 255 character',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], QuotationRequest.prototype, "orderValue", void 0);
exports.QuotationRequest = QuotationRequest;
//# sourceMappingURL=CreateQuotationRequest.js.map