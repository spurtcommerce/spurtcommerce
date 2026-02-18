"use strict";
/* tslint:disable:max-classes-per-file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategoryTranslationRequest = void 0;
const tslib_1 = require("tslib");
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class BlogCategoryTranslation {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], BlogCategoryTranslation.prototype, "languageId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'title should be maximum 255 characters',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], BlogCategoryTranslation.prototype, "name", void 0);
class BlogCategoryTranslationRequest {
}
exports.BlogCategoryTranslationRequest = BlogCategoryTranslationRequest;
tslib_1.__decorate([
    (0, class_transformer_1.Type)(() => BlogCategoryTranslation),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", Array)
], BlogCategoryTranslationRequest.prototype, "blogCategoryTranslation", void 0);
//# sourceMappingURL=AddBlogCategoryTranslationRequest.js.map