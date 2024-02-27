"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationAttrGrpToAttributeRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const SpecificationAttributeGrpToAttribute_1 = require("../models/SpecificationAttributeGrpToAttribute");
let SpecificationAttrGrpToAttributeRepository = class SpecificationAttrGrpToAttributeRepository extends typeorm_1.Repository {
};
SpecificationAttrGrpToAttributeRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(SpecificationAttributeGrpToAttribute_1.SpecificationAttrGrpToAttribute)
], SpecificationAttrGrpToAttributeRepository);
exports.SpecificationAttrGrpToAttributeRepository = SpecificationAttrGrpToAttributeRepository;
//# sourceMappingURL=SpecAttrGrpToAttributeRepository.js.map