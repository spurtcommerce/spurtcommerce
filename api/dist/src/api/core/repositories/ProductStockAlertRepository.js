"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStockAlertRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductStockAlert_1 = require("../models/ProductStockAlert");
let ProductStockAlertRepository = class ProductStockAlertRepository extends typeorm_1.Repository {
};
ProductStockAlertRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductStockAlert_1.ProductStockAlert)
], ProductStockAlertRepository);
exports.ProductStockAlertRepository = ProductStockAlertRepository;
//# sourceMappingURL=ProductStockAlertRepository.js.map