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
const Variant_1 = require("../models/Variant");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let VariantRepository = class VariantRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Variant_1.Variant);
    }
};
exports.VariantRepository = VariantRepository;
exports.VariantRepository = VariantRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VariantRepository);
//# sourceMappingURL=VariantRepository.js.map