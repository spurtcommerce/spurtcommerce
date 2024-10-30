"use strict";
/* tslint:disable:max-classes-per-file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductTranslationRequest = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class TranslationView {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], TranslationView.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TranslationView.prototype, "name", void 0);
class VendorProductTranslationRequest {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => TranslationView),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", Array)
], VendorProductTranslationRequest.prototype, "productTranslation", void 0);
exports.VendorProductTranslationRequest = VendorProductTranslationRequest;
//# sourceMappingURL=VendorProductTranslationRequest.js.map