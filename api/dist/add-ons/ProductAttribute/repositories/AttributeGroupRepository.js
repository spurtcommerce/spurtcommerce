"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeGroupRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const AttributeGroup_1 = require("../models/AttributeGroup");
let AttributeGroupRepository = class AttributeGroupRepository extends typeorm_1.Repository {
};
AttributeGroupRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(AttributeGroup_1.AttributeGroup)
], AttributeGroupRepository);
exports.AttributeGroupRepository = AttributeGroupRepository;
//# sourceMappingURL=AttributeGroupRepository.js.map