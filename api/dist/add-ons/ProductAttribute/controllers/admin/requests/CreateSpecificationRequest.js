"use strict";
/* tslint:disable:max-classes-per-file */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSpecification = void 0;
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
class AttributeGroups {
}
class CreateSpecification {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Attribute name is required',
    }),
    (0, class_validator_1.MaxLength)(255, {
        message: 'attribute name should be maximum 255 characters',
    }),
    tslib_1.__metadata("design:type", String)
], CreateSpecification.prototype, "name", void 0);
exports.CreateSpecification = CreateSpecification;
//# sourceMappingURL=CreateSpecificationRequest.js.map