"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductRequest = exports.ProductType = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
var ProductType;
(function (ProductType) {
    ProductType["PHYSICAL"] = "physical";
    ProductType["VIRTUAL"] = "virtual";
})(ProductType || (exports.ProductType = ProductType = {}));
class VendorProductRequest {
}
exports.VendorProductRequest = VendorProductRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255, {
        message: 'productName should be maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], VendorProductRequest.prototype, "productName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(64, {
        message: 'sku should be maximum 64 character',
    }),
    tslib_1.__metadata("design:type", String)
], VendorProductRequest.prototype, "sku", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateIf)(o => o.productType === ProductType.PHYSICAL),
    (0, class_validator_1.IsNotEmpty)({
        message: 'Quantity is required for physical products',
    }),
    tslib_1.__metadata("design:type", Number)
], VendorProductRequest.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], VendorProductRequest.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VendorProductRequest.prototype, "image", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateIf)(o => o.isGrouped !== 1),
    (0, class_validator_1.IsNotEmpty)({ message: 'Price should not be empty' }),
    tslib_1.__metadata("design:type", Number)
], VendorProductRequest.prototype, "price", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Max)(9999, {
        message: 'Maximum length of sortOrder should be 4',
    }),
    tslib_1.__metadata("design:type", Number)
], VendorProductRequest.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], VendorProductRequest.prototype, "isSpecification", void 0);
//# sourceMappingURL=VendorProductRequest.js.map