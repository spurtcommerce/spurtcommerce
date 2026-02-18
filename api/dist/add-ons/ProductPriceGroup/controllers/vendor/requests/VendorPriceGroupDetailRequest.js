"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceGroupDetailRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class PriceGroupDetailRequest {
}
exports.PriceGroupDetailRequest = PriceGroupDetailRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], PriceGroupDetailRequest.prototype, "priceGroupId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], PriceGroupDetailRequest.prototype, "scheduleId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], PriceGroupDetailRequest.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], PriceGroupDetailRequest.prototype, "currencyId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], PriceGroupDetailRequest.prototype, "maxQuanttiy", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], PriceGroupDetailRequest.prototype, "price", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], PriceGroupDetailRequest.prototype, "isDefault", void 0);
//# sourceMappingURL=VendorPriceGroupDetailRequest.js.map