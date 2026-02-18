"use strict";
/* tslint:disable:max-classes-per-file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAttributeGroupTranslationRequest = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class AttributeGroupTranslationView {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], AttributeGroupTranslationView.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AttributeGroupTranslationView.prototype, "name", void 0);
class CreateAttributeGroupTranslationRequest {
}
exports.CreateAttributeGroupTranslationRequest = CreateAttributeGroupTranslationRequest;
tslib_1.__decorate([
    (0, class_transformer_1.Type)(() => AttributeGroupTranslationView),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", Array)
], CreateAttributeGroupTranslationRequest.prototype, "attributeGroupTranslation", void 0);
//# sourceMappingURL=CreateAttributeGroupTranslationRequest.js.map