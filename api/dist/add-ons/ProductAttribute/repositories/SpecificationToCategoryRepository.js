"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationToCategoryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const SpecificationToCategory_1 = require("../models/SpecificationToCategory");
let SpecificationToCategoryRepository = class SpecificationToCategoryRepository extends typeorm_1.Repository {
};
SpecificationToCategoryRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(SpecificationToCategory_1.SpecificationToCategory)
], SpecificationToCategoryRepository);
exports.SpecificationToCategoryRepository = SpecificationToCategoryRepository;
//# sourceMappingURL=SpecificationToCategoryRepository.js.map