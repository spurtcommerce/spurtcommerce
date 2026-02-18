"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductPriceGroupRequest = void 0;
const tslib_1 = require("tslib");
/* tslint:disable:max-classes-per-file */
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateProductPriceGroupRequest {
}
exports.CreateProductPriceGroupRequest = CreateProductPriceGroupRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateProductPriceGroupRequest.prototype, "priceGroupId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateProductPriceGroupRequest.prototype, "skuId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateProductPriceGroupRequest.prototype, "maxQuantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateProductPriceGroupRequest.prototype, "price", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateProductPriceGroupRequest.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateProductPriceGroupRequest.prototype, "endDate", void 0);
//# sourceMappingURL=CreateProductPriceGroupRequest.js.map