"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactAdminRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class ContactAdminRequest {
}
exports.ContactAdminRequest = ContactAdminRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ContactAdminRequest.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'emailId is requier' }),
    tslib_1.__metadata("design:type", String)
], ContactAdminRequest.prototype, "emailId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ContactAdminRequest.prototype, "userRequirements", void 0);
//# sourceMappingURL=ContactAdminRequest.js.map