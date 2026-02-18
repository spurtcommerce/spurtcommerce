"use strict";
/*
 * Spurtcommerce PRO
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorQuotationRepository = void 0;
const tslib_1 = require("tslib");
const VendorQuotation_1 = require("../models/VendorQuotation");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorQuotationRepository = class VendorQuotationRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorQuotation_1.VendorQuotation);
    }
};
exports.VendorQuotationRepository = VendorQuotationRepository;
exports.VendorQuotationRepository = VendorQuotationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorQuotationRepository);
//# sourceMappingURL=VendorQuotationRepository.js.map