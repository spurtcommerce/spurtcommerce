"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorCouponProductCategoryRepository = void 0;
const tslib_1 = require("tslib");
const VendorCouponProductCategory_1 = require("../models/VendorCouponProductCategory");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let VendorCouponProductCategoryRepository = class VendorCouponProductCategoryRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(VendorCouponProductCategory_1.VendorCouponProductCategory);
    }
};
exports.VendorCouponProductCategoryRepository = VendorCouponProductCategoryRepository;
exports.VendorCouponProductCategoryRepository = VendorCouponProductCategoryRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], VendorCouponProductCategoryRepository);
//# sourceMappingURL=VendorCouponProductCategoryRepository.js.map