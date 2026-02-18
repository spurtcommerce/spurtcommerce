"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierRepository = void 0;
const tslib_1 = require("tslib");
const Supplier_1 = require("../models/Supplier");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let SupplierRepository = class SupplierRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Supplier_1.Supplier);
    }
};
exports.SupplierRepository = SupplierRepository;
exports.SupplierRepository = SupplierRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], SupplierRepository);
//# sourceMappingURL=SupplierRepository.js.map