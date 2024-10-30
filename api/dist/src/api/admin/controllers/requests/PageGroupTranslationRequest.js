"use strict";
/* tslint:disable:max-classes-per-file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePageGroupTranslationDTO = void 0;
const tslib_1 = require("tslib");
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PageGroupTranslationDTO {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'group name should be maximum 255 character',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'group name is required',
    }),
    tslib_1.__metadata("design:type", String)
], PageGroupTranslationDTO.prototype, "groupName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'languageId is required',
    }),
    tslib_1.__metadata("design:type", Number)
], PageGroupTranslationDTO.prototype, "languageId", void 0);
class CreatePageGroupTranslationDTO {
}
tslib_1.__decorate([
    (0, class_transformer_1.Type)(() => PageGroupTranslationDTO),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", Array)
], CreatePageGroupTranslationDTO.prototype, "pageGroupTranslation", void 0);
exports.CreatePageGroupTranslationDTO = CreatePageGroupTranslationDTO;
//# sourceMappingURL=PageGroupTranslationRequest.js.map