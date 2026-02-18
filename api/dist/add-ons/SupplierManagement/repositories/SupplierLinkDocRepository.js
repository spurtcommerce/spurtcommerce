"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierLinkDocRepository = void 0;
const tslib_1 = require("tslib");
const SupplierLinkDoc_1 = require("../models/SupplierLinkDoc");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let SupplierLinkDocRepository = class SupplierLinkDocRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(SupplierLinkDoc_1.SupplierLinkDoc);
    }
};
exports.SupplierLinkDocRepository = SupplierLinkDocRepository;
exports.SupplierLinkDocRepository = SupplierLinkDocRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], SupplierLinkDocRepository);
//# sourceMappingURL=SupplierLinkDocRepository.js.map