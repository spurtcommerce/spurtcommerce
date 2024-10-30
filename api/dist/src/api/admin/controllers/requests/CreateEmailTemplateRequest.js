"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmailTemplate = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateEmailTemplate {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(30, {
        message: 'title is maximum 30 character',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateEmailTemplate.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255, {
        message: 'subject should be maximum 255 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateEmailTemplate.prototype, "subject", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'content is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateEmailTemplate.prototype, "content", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateEmailTemplate.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateEmailTemplate.prototype, "dynamicFieldsRef", void 0);
exports.CreateEmailTemplate = CreateEmailTemplate;
//# sourceMappingURL=CreateEmailTemplateRequest.js.map