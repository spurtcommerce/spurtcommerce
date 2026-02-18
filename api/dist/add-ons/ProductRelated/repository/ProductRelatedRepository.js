"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRelatedRepository = void 0;
const tslib_1 = require("tslib");
const ProductRelated_1 = require("../models/ProductRelated");
const typeormLoader_1 = require("../../../src/loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductRelatedRepository = class ProductRelatedRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductRelated_1.ProductRelated);
    }
    productRelatedCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.manager.createQueryBuilder(ProductRelated_1.ProductRelated, 'relatedProduct');
            query.select(['relatedProduct.productId']);
            query.where('relatedProduct.productId = :productId', { productId: id });
            return query.getCount();
        });
    }
};
exports.ProductRelatedRepository = ProductRelatedRepository;
exports.ProductRelatedRepository = ProductRelatedRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductRelatedRepository);
//# sourceMappingURL=ProductRelatedRepository.js.map