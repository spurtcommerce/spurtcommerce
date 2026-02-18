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
const VariantValue_1 = require("../models/VariantValue");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let VariantValueRepository = class VariantValueRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VariantValue_1.VariantValue);
    }
};
exports.VariantValueRepository = VariantValueRepository;
exports.VariantValueRepository = VariantValueRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VariantValueRepository);
//# sourceMappingURL=VariantValueRepository.js.map