"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Variant_1 = require("../models/Variant");
let VariantRepository = class VariantRepository extends typeorm_1.Repository {
};
VariantRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Variant_1.Variant)
], VariantRepository);
exports.VariantRepository = VariantRepository;
//# sourceMappingURL=VariantRepository.js.map