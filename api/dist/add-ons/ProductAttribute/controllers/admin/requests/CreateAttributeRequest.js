"use strict";
/* tslint:disable:max-classes-per-file */
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAttribute = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AttributeValue {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], AttributeValue.prototype, "value", void 0);
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
], CreateAttribute.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'sortOrder is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateAttribute.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'type is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateAttribute.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => AttributeValue),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", Array)
], CreateAttribute.prototype, "attributeValues", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], CreateAttribute.prototype, "deleteAttributeValueIds", void 0);
exports.CreateAttribute = CreateAttribute;
//# sourceMappingURL=CreateAttributeRequest.js.map