"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSupplierContactRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateSupplierContactRequest {
}
exports.CreateSupplierContactRequest = CreateSupplierContactRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateSupplierContactRequest.prototype, "supplierId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], CreateSupplierContactRequest.prototype, "status", void 0);
//# sourceMappingURL=CreateSupplierContactRequest.js.map