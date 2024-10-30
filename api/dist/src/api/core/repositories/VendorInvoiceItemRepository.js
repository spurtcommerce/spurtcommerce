"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorInvoiceItemRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const VendorInvoiceItem_1 = require("../models/VendorInvoiceItem");
let VendorInvoiceItemRepository = class VendorInvoiceItemRepository extends typeorm_1.Repository {
};
VendorInvoiceItemRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(VendorInvoiceItem_1.VendorInvoiceItem)
], VendorInvoiceItemRepository);
exports.VendorInvoiceItemRepository = VendorInvoiceItemRepository;
//# sourceMappingURL=VendorInvoiceItemRepository.js.map