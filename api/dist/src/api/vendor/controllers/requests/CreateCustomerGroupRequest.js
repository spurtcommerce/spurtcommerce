"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerGroupRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class BuyerGroupRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyerGroupRequest.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], BuyerGroupRequest.prototype, "status", void 0);
exports.BuyerGroupRequest = BuyerGroupRequest;
//# sourceMappingURL=CreateCustomerGroupRequest.js.map