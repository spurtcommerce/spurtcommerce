"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAttributeGroup = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateAttributeGroup {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Attribute name is required',
    }),
    (0, class_validator_1.MaxLength)(255, {
        message: 'attribute name should be maximum 255 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateAttributeGroup.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'sortOrder is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateAttributeGroup.prototype, "sortOrder", void 0);
exports.CreateAttributeGroup = CreateAttributeGroup;
//# sourceMappingURL=CreateAttributeGroupRequest.js.map