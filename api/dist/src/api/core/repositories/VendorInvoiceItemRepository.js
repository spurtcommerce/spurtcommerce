"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorInvoiceItemRepository = void 0;
const tslib_1 = require("tslib");
const VendorInvoiceItem_1 = require("../models/VendorInvoiceItem");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorInvoiceItemRepository = class VendorInvoiceItemRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorInvoiceItem_1.VendorInvoiceItem);
    }
};
exports.VendorInvoiceItemRepository = VendorInvoiceItemRepository;
exports.VendorInvoiceItemRepository = VendorInvoiceItemRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorInvoiceItemRepository);
//# sourceMappingURL=VendorInvoiceItemRepository.js.map