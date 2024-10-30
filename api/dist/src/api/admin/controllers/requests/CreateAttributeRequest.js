"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAttribute = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateAttribute {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Attribute name is required',
    }),
    (0, class_validator_1.MaxLength)(255, {
        message: 'attribute name should be maximum 255 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateAttribute.prototype, "attributeName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'group is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateAttribute.prototype, "groupId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Max)(9999, {
        message: 'maximum length of sort order should be 4',
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'sortOrder is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateAttribute.prototype, "sortOrder", void 0);
exports.CreateAttribute = CreateAttribute;
//# sourceMappingURL=CreateAttributeRequest.js.map