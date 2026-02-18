"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStockAlertRepository = void 0;
const tslib_1 = require("tslib");
const ProductStockAlert_1 = require("../models/ProductStockAlert");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let ProductStockAlertRepository = class ProductStockAlertRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductStockAlert_1.ProductStockAlert);
    }
};
exports.ProductStockAlertRepository = ProductStockAlertRepository;
exports.ProductStockAlertRepository = ProductStockAlertRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductStockAlertRepository);
//# sourceMappingURL=ProductStockAlertRepository.js.map