"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductViewLogRepository = void 0;
const tslib_1 = require("tslib");
const productViewLog_1 = require("../models/productViewLog");
const typedi_1 = require("typedi");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
let ProductViewLogRepository = class ProductViewLogRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(productViewLog_1.ProductViewLog);
    }
};
exports.ProductViewLogRepository = ProductViewLogRepository;
exports.ProductViewLogRepository = ProductViewLogRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductViewLogRepository);
//# sourceMappingURL=ProductViewLogRepository.js.map