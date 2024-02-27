"use strict";
/* tslint:disable:max-classes-per-file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVariant = exports.UpdateVariantValue = void 0;
const tslib_1 = require("tslib");
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UpdateVariantValue {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateVariantValue.prototype, "value", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], UpdateVariantValue.prototype, "sortOrder", void 0);
exports.UpdateVariantValue = UpdateVariantValue;
class UpdateVariant {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'name should be maximum 255 character',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateVariant.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Max)(9999, {
        message: 'Maximum length of sortOrder should be 4',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], UpdateVariant.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdateVariantValue),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", Array)
], UpdateVariant.prototype, "variantValue", void 0);
exports.UpdateVariant = UpdateVariant;
//# sourceMappingURL=UpdateVariantRequest.js.map