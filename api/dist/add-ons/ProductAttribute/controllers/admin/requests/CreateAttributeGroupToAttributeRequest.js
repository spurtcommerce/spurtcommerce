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
exports.CreateAttributeGroupToAttribute = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AttributeGroupAttributes {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], AttributeGroupAttributes.prototype, "attributeGroupId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", Array)
], AttributeGroupAttributes.prototype, "attributeIds", void 0);
class CreateAttributeGroupToAttribute {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AttributeGroupAttributes),
    (0, class_validator_1.ArrayMinSize)(1),
    tslib_1.__metadata("design:type", Array)
], CreateAttributeGroupToAttribute.prototype, "attributeGroupAttributes", void 0);
exports.CreateAttributeGroupToAttribute = CreateAttributeGroupToAttribute;
//# sourceMappingURL=CreateAttributeGroupToAttributeRequest.js.map