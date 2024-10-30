"use strict";
/* tslint:disable:max-classes-per-file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorVerificationComment = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class VendorVerificationComment {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VendorVerificationComment.prototype, "comment", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VendorVerificationComment.prototype, "commentFor", void 0);
exports.VendorVerificationComment = VendorVerificationComment;
//# sourceMappingURL=CreateVendorVerificationCommentRequest.js.map