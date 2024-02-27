"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantValueRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VariantValue_1 = require("../models/VariantValue");
let VariantValueRepository = class VariantValueRepository extends typeorm_1.Repository {
};
VariantValueRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(VariantValue_1.VariantValue)
], VariantValueRepository);
exports.VariantValueRepository = VariantValueRepository;
//# sourceMappingURL=VariantValueRepository.js.map