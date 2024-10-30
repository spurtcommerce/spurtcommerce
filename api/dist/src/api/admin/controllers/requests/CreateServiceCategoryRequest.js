"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServiceCategory = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateServiceCategory {
}
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'name should be maximum 255 characters',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateServiceCategory.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateServiceCategory.prototype, "parentInt", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Max)(9999, {
        message: 'Maximum length of sortOrder should be 4',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateServiceCategory.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(70, {
        message: 'metatagTitle should be maximum 70 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateServiceCategory.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(160, {
        message: 'metaTagDescription should be maximum 160 character',
    }),
    tslib_1.__metadata("design:type", String)
], CreateServiceCategory.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'metaTagKeyword should be maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], CreateServiceCategory.prototype, "metaTagKeyword", void 0);
exports.CreateServiceCategory = CreateServiceCategory;
//# sourceMappingURL=CreateServiceCategoryRequest.js.map