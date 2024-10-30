"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorVerifiedRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class VendorVerifiedRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VendorVerifiedRequest.prototype, "key", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VendorVerifiedRequest.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VendorVerifiedRequest.prototype, "password", void 0);
exports.VendorVerifiedRequest = VendorVerifiedRequest;
//# sourceMappingURL=VendorVerifiedRequest.js.map