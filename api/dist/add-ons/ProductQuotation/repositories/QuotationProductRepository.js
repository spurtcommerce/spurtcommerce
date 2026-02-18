"use strict";
/*
 * Spurtcommerce PRO
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationProductRepository = void 0;
const tslib_1 = require("tslib");
const QuotationProduct_1 = require("../models/QuotationProduct");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let QuotationProductRepository = class QuotationProductRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(QuotationProduct_1.QuotationProduct);
    }
};
exports.QuotationProductRepository = QuotationProductRepository;
exports.QuotationProductRepository = QuotationProductRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], QuotationProductRepository);
//# sourceMappingURL=QuotationProductRepository.js.map