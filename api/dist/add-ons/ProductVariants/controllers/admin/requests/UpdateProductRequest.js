"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductRequest = exports.ProductVarientOption = void 0;
const tslib_1 = require("tslib");
/* tslint:disable:max-classes-per-file */
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class ProductVarientOption {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ProductVarientOption.prototype, "varientName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], ProductVarientOption.prototype, "price", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ProductVarientOption.prototype, "sku", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], ProductVarientOption.prototype, "quantity", void 0);
exports.ProductVarientOption = ProductVarientOption;
class UpdateProductRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], UpdateProductRequest.prototype, "productId", void 0);
exports.UpdateProductRequest = UpdateProductRequest;
//# sourceMappingURL=UpdateProductRequest.js.map