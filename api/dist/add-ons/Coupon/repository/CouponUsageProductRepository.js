"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponUsageProductRepository = void 0;
const tslib_1 = require("tslib");
const CouponUsageProduct_1 = require("../models/CouponUsageProduct");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let CouponUsageProductRepository = class CouponUsageProductRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(CouponUsageProduct_1.CouponUsageProduct);
    }
};
exports.CouponUsageProductRepository = CouponUsageProductRepository;
exports.CouponUsageProductRepository = CouponUsageProductRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], CouponUsageProductRepository);
//# sourceMappingURL=CouponUsageProductRepository.js.map