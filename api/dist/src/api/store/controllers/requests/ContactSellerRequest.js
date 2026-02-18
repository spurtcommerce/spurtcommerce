"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSellerRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class ContactSellerRequest {
}
exports.ContactSellerRequest = ContactSellerRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ContactSellerRequest.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'emailId is requier' }),
    tslib_1.__metadata("design:type", String)
], ContactSellerRequest.prototype, "emailId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ContactSellerRequest.prototype, "userRequirements", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ContactSellerRequest.prototype, "vendorEmailId", void 0);
//# sourceMappingURL=ContactSellerRequest.js.map