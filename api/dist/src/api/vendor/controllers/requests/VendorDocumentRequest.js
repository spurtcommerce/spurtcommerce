"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorDocumentRequest = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class VendorDocumentRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], VendorDocumentRequest.prototype, "documentId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VendorDocumentRequest.prototype, "fileName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VendorDocumentRequest.prototype, "filePath", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], VendorDocumentRequest.prototype, "vendorId", void 0);
exports.VendorDocumentRequest = VendorDocumentRequest;
//# sourceMappingURL=VendorDocumentRequest.js.map