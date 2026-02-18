"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
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
    quotationCount(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(Quotation_1.Quotation, 'quotation');
            query.select(['quotation.productId as quotaionCount']);
            query.where('quotation.productId = ' + productId);
            query.groupBy('quotation.productId');
            return query.getCount();
        });
    }
};
exports.QuotationRepository = QuotationRepository;
exports.QuotationRepository = QuotationRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], QuotationRepository);
//# sourceMappingURL=QuotationRepository-old.js.map