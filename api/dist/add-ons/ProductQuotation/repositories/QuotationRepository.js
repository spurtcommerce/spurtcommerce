"use strict";
/*
 * Spurtcommerce PRO
 * version 4.8.1
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuotationRepository = void 0;
const tslib_1 = require("tslib");
const Quotation_1 = require("../models/Quotation");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let QuotationRepository = class QuotationRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(Quotation_1.Quotation);
    }
};
exports.QuotationRepository = QuotationRepository;
exports.QuotationRepository = QuotationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], QuotationRepository);
//# sourceMappingURL=QuotationRepository.js.map