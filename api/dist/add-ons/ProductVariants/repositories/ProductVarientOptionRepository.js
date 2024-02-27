"use strict";
/*
* Spurtcommerce
* https://www.spurtcommerce.com
* Copyright (c) 2023  Spurtcommerce E-solutions Private Limited
* Author Spurtcommerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVarientOptionRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductVarientOption_1 = require("../models/ProductVarientOption");
let ProductVarientOptionRepository = class ProductVarientOptionRepository extends typeorm_1.Repository {
    variantCount(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductVarientOption_1.ProductVarientOption, 'productVarientOption');
            query.select(['productVarientOption.id as variantCount']);
            query.innerJoin('productVarientOption.product', 'product');
            query.where('productVarientOption.productId = ' + id);
            query.andWhere('product.isSimplified = 0');
            return query.getCount();
        });
    }
    findSkuForProductVarient(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductVarientOption_1.ProductVarientOption, 'productVarientOption');
            query.select(['skuDetail.id as id', 'skuDetail.skuName as skuName', 'skuDetail.price as price', 'skuDetail.enableBackOrders as enableBackOrders', 'skuDetail.outOfStockThreshold as outOfStockThreshold', 'skuDetail.notifyMinQuantity as notifyMinQuantity', 'skuDetail.minQuantityAllowedCart as minQuantityAllowedCart', 'skuDetail.maxQuantityAllowedCart as maxQuantityAllowedCart']);
            query.leftJoin('productVarientOption.product', 'product');
            query.leftJoin('productVarientOption.skuDetail', 'skuDetail');
            query.where('productVarientOption.productId = :id', { id: productId });
            return query.getRawMany();
        });
    }
};
ProductVarientOptionRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductVarientOption_1.ProductVarientOption)
], ProductVarientOptionRepository);
exports.ProductVarientOptionRepository = ProductVarientOptionRepository;
//# sourceMappingURL=ProductVarientOptionRepository.js.map