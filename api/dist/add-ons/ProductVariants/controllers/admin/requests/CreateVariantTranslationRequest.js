"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVariantTranslationRequest = void 0;
const tslib_1 = require("tslib");
/* tslint:disable:max-classes-per-file */
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateVariantValueTranslation {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateVariantValueTranslation.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateVariantValueTranslation.prototype, "value", void 0);
class CreateVariantValue {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateVariantValue.prototype, "variantValueId", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Type)(() => CreateVariantValueTranslation),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", Array)
], CreateVariantValue.prototype, "variantValueTranslation", void 0);
class CreateVariantTranslation {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateVariantTranslation.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateVariantTranslation.prototype, "name", void 0);
class CreateVariantTranslationRequest {
}
exports.CreateVariantTranslationRequest = CreateVariantTranslationRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => CreateVariantTranslation),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", Array)
], CreateVariantTranslationRequest.prototype, "variantTranslation", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Type)(() => CreateVariantValue),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", Array)
], CreateVariantTranslationRequest.prototype, "variantValues", void 0);
//# sourceMappingURL=CreateVariantTranslationRequest.js.map