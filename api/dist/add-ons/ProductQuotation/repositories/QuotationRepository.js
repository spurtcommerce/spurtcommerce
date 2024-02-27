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
const typeorm_1 = require("typeorm");
const Quotation_1 = require("../models/Quotation");
let QuotationRepository = class QuotationRepository extends typeorm_1.Repository {
    quotationCount(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Quotation_1.Quotation, 'quotation');
            query.select(['quotation.productId as quotaionCount']);
            query.where('quotation.productId = ' + productId);
            query.groupBy('quotation.productId');
            return query.getCount();
        });
    }
};
QuotationRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(Quotation_1.Quotation)
], QuotationRepository);
exports.QuotationRepository = QuotationRepository;
//# sourceMappingURL=QuotationRepository.js.map