"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAttributeTranslatorRequest = void 0;
const tslib_1 = require("tslib");
/* tslint:disable:max-classes-per-file */
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateAttributeValueTranslation {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateAttributeValueTranslation.prototype, "languageId", void 0);
class CreateAttributeValue {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateAttributeValue.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Type)(() => CreateAttributeValueTranslation),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", Array)
], CreateAttributeValue.prototype, "attributeValueTranslation", void 0);
class CreateAttributeTranslation {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateAttributeTranslation.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateAttributeTranslation.prototype, "attributeName", void 0);
class CreateAttributeTranslatorRequest {
}
exports.CreateAttributeTranslatorRequest = CreateAttributeTranslatorRequest;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => CreateAttributeTranslation),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", Array)
], CreateAttributeTranslatorRequest.prototype, "attributeTranslation", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Type)(() => CreateAttributeValue),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", Array)
], CreateAttributeTranslatorRequest.prototype, "attributeValues", void 0);
//# sourceMappingURL=CreateAttributeTranslatorRequest.js.map