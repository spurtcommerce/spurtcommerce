"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPriceLogRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductPriceLog_1 = require("../models/ProductPriceLog");
let ProductPriceLogRepository = class ProductPriceLogRepository extends typeorm_1.Repository {
};
ProductPriceLogRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductPriceLog_1.ProductPriceLog)
], ProductPriceLogRepository);
exports.ProductPriceLogRepository = ProductPriceLogRepository;
//# sourceMappingURL=ProductPriceLogRepository.js.map