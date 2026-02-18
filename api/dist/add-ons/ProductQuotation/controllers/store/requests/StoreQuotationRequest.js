"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreQuotationRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class StoreQuotationRequest {
}
exports.StoreQuotationRequest = StoreQuotationRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], StoreQuotationRequest.prototype, "firstname", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], StoreQuotationRequest.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], StoreQuotationRequest.prototype, "telephone", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], StoreQuotationRequest.prototype, "businessName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], StoreQuotationRequest.prototype, "total", void 0);
//# sourceMappingURL=StoreQuotationRequest.js.map