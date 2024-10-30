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
exports.CreateService = void 0;
const tslib_1 = require("tslib");
// Validation file for creating new service
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateService {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateService.prototype, "serviceCategoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'title should be maximum 255 characters',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateService.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(15, {
        message: 'mobile should be maximum 15 characters',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateService.prototype, "mobile", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(70, {
        message: 'metatagTitle should be maximum 70 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateService.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(160, {
        message: 'metaTagDescription should be maximum 160 character',
    }),
    tslib_1.__metadata("design:type", String)
], CreateService.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: 'metaTagKeyword should be maximum 255 character',
    }),
    tslib_1.__metadata("design:type", String)
], CreateService.prototype, "metaTagKeyword", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateService.prototype, "status", void 0);
exports.CreateService = CreateService;
//# sourceMappingURL=CreateServiceRequest.js.map