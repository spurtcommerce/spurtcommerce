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
const typeorm_1 = require("typeorm");
const ProductRelated_1 = require("../models/ProductRelated");
let ProductRelatedRepository = class ProductRelatedRepository extends typeorm_1.Repository {
    productRelatedCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductRelated_1.ProductRelated, 'relatedProduct');
            query.select(['relatedProduct.productId']);
            query.where('relatedProduct.productId = :productId', { productId: id });
            return query.getCount();
        });
    }
};
ProductRelatedRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductRelated_1.ProductRelated)
], ProductRelatedRepository);
exports.ProductRelatedRepository = ProductRelatedRepository;
//# sourceMappingURL=ProductRelatedRepository.js.map