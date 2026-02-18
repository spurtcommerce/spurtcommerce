"use strict";
/*
 * spurtcommerce API
 * version 5.2.0
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDiscountRepository = void 0;
const tslib_1 = require("tslib");
const ProductDiscount_1 = require("../models/ProductDiscount");
const typeormLoader_1 = require("../../../loaders/typeormLoader");
const typedi_1 = require("typedi");
let ProductDiscountRepository = class ProductDiscountRepository {
    constructor() {
        this.repository = (0, typeormLoader_1.getDataSource)().getRepository(ProductDiscount_1.ProductDiscount);
    }
    findDiscountPrice(productId, todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.repository.createQueryBuilder('productDiscount');
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
            const query = yield this.repository.createQueryBuilder('productDiscount');
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
exports.ProductDiscountRepository = ProductDiscountRepository;
exports.ProductDiscountRepository = ProductDiscountRepository = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__metadata("design:paramtypes", [])
], ProductDiscountRepository);
//# sourceMappingURL=ProductDiscountRepository.js.map