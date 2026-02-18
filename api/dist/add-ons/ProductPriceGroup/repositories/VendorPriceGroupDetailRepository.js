"use strict";
/*
 * spurtcommerce API
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorPriceGroupDetailRepository = void 0;
const tslib_1 = require("tslib");
const VendorPriceGroupDetail_1 = require("../models/VendorPriceGroupDetail");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorPriceGroupDetailRepository = class VendorPriceGroupDetailRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorPriceGroupDetail_1.VendorPriceGroupDetail);
    }
};
exports.VendorPriceGroupDetailRepository = VendorPriceGroupDetailRepository;
exports.VendorPriceGroupDetailRepository = VendorPriceGroupDetailRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorPriceGroupDetailRepository);
//# sourceMappingURL=VendorPriceGroupDetailRepository.js.map