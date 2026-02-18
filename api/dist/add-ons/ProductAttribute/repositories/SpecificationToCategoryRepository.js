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
const SpecificationToCategory_1 = require("../models/SpecificationToCategory");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let SpecificationToCategoryRepository = class SpecificationToCategoryRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(SpecificationToCategory_1.SpecificationToCategory);
    }
};
exports.SpecificationToCategoryRepository = SpecificationToCategoryRepository;
exports.SpecificationToCategoryRepository = SpecificationToCategoryRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], SpecificationToCategoryRepository);
//# sourceMappingURL=SpecificationToCategoryRepository.js.map