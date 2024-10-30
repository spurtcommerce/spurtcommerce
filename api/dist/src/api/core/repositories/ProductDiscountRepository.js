"use strict";
/*
 * spurtcommerce API
 * version 5.0.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDiscountRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductDiscount_1 = require("../models/ProductDiscount");
let ProductDiscountRepository = class ProductDiscountRepository extends typeorm_1.Repository {
    findDiscountPrice(productId, todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductDiscount_1.ProductDiscount, 'productDiscount');
            query.select(['productDiscount.price as price', 'productDiscount.dateStart as dateStart', 'productDiscount.dateEnd as dateEnd']);
            query.where('productDiscount.productId = ' + productId);
            query.andWhere('(productDiscount.dateStart <= :todaydate AND productDiscount.dateEnd >= :todaydate)', { todaydate });
            query.orderBy('productDiscount.priority', 'ASC');
            query.addOrderBy('productDiscount.price', 'ASC');
            query.limit('1');
            return query.getRawOne();
        });
    }
    findDiscountPricewithSku(productId, skuId, todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(ProductDiscount_1.ProductDiscount, 'productDiscount');
            query.select(['productDiscount.price as price', 'productDiscount.dateStart as dateStart', 'productDiscount.dateEnd as dateEnd']);
            query.where('productDiscount.productId = ' + productId);
            query.where('productDiscount.skuId = ' + skuId);
            query.andWhere('(productDiscount.dateStart <= :todaydate AND productDiscount.dateEnd >= :todaydate)', { todaydate });
            query.orderBy('productDiscount.priority', 'ASC');
            query.addOrderBy('productDiscount.price', 'ASC');
            query.limit('1');
            return query.getRawOne();
        });
    }
};
ProductDiscountRepository = tslib_1.__decorate([
    (0, typeorm_1.EntityRepository)(ProductDiscount_1.ProductDiscount)
], ProductDiscountRepository);
exports.ProductDiscountRepository = ProductDiscountRepository;
//# sourceMappingURL=ProductDiscountRepository.js.map