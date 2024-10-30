"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTirePriceRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductTirePrice_1 = require("../models/ProductTirePrice");
let ProductTirePriceRepository = class ProductTirePriceRepository extends typeorm_1.Repository {
    findTirePrice(productId, skuId, quantity) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductTirePrice_1.ProductTirePrice, 'productTirePrice');
            query.select(['productTirePrice.price as price', 'productTirePrice.quantity as quantity', 'productTirePrice.productId as productId']);
            query.where('productTirePrice.productId = ' + productId);
            query.where('productTirePrice.skuId = ' + skuId);
            query.andWhere('productTirePrice.quantity <= ' + quantity);
            query.orderBy('productTirePrice.quantity', 'DESC');
            query.limit('1');
            return query.getRawOne();
        });
    }
};
ProductTirePriceRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductTirePrice_1.ProductTirePrice)
], ProductTirePriceRepository);
exports.ProductTirePriceRepository = ProductTirePriceRepository;
//# sourceMappingURL=ProductTirePriceRepository.js.map